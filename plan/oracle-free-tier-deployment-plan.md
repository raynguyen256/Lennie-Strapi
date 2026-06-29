# Deployment Plan — Phương án 2 (Oracle Cloud Free Tier, All-in-One)

> Status: ĐANG REVIEW — chưa thực hiện.

## Context

Triển khai toàn bộ stack (Strapi backend + Next.js frontend + Postgres + reverse proxy) trên Oracle Cloud Free Tier, dùng 1 VM duy nhất. Ưu điểm so với Phương án 1 (Render):

- **Không cold-start** — VM chạy 24/7
- **RAM 24GB** — build Strapi admin panel không lo OOM (so với Render free 512MB)
- **Storage 200GB persistent** — media uploads lưu trực tiếp trên VM, không cần Cloudinary
- **Chi phí: 0đ** (miễn phí vĩnh viễn theo Oracle Always Free policy)
- **Latency thấp hơn Render** nếu chọn region Singapore/Seoul (gần VN hơn US)

**Nhược điểm:** Tự quản lý server (không có PaaS), Oracle có thể thu hồi nếu account không hoạt động (hiếm), cần SSH để deploy.

---

## Hạ tầng Oracle Free Tier sử dụng

| Resource | Spec | Ghi chú |
|---|---|---|
| VM.Standard.A1.Flex (ARM Ampere) | 4 OCPU / 24GB RAM / 200GB boot volume | Always Free, chọn region Singapore |
| Reserved Public IP | 1 IP tĩnh | Always Free |
| VCN + Security List | Open port 22, 80, 443 | Cần mở cả iptables trong VM (hay bị quên) |

> Không dùng 2x AMD E2.1.Micro (chỉ 1GB RAM mỗi máy — quá thấp cho stack Node.js).

---

## Kiến trúc Docker Compose trên VM

```
Internet → Caddy (80/443) → [strapi:1337] hoặc [nextjs:3000]
                           → PostgreSQL (5432, nội bộ)
```

**Services trong `docker-compose.yml`:**

| Service | Image | Port (internal) | Volume |
|---|---|---|---|
| `caddy` | `caddy:alpine` | 80, 443 (public) | `caddy_data` (certs) |
| `strapi` | Node 20 ARM64 (build từ Dockerfile) | 1337 | `./backend`, `strapi_uploads` |
| `nextjs` | Node 20 ARM64 (build từ Dockerfile) | 3000 | `./frontend` |
| `postgres` | `postgres:16-alpine` | 5432 | `pg_data` |

**Caddyfile** (2 subdomain riêng biệt — clean hơn 1 domain với path routing):
```
api.yourdomain.com {
    reverse_proxy strapi:1337
}

yourdomain.com, www.yourdomain.com {
    reverse_proxy nextjs:3000
}
```
Caddy tự động cấp SSL qua Let's Encrypt — không cần certbot/cron riêng.

---

## Files cần tạo trong repo

### 1. `docker-compose.yml` (tại root monorepo)

Định nghĩa 4 services trên, network nội bộ, volumes persistent, pass env vars từ `.env.production`.

### 2. `Caddyfile` (tại root)

Reverse proxy config như trên, điền domain thực sau khi có.

### 3. `backend/Dockerfile`

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "start"]
```
> Image `node:20-alpine` hỗ trợ ARM64 — không cần build image riêng cho Ampere.

### 4. `frontend/Dockerfile`

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```
> Dùng `output: 'standalone'` trong next.config.mjs để image nhỏ hơn.

### 5. Code changes (giống Phương án 1)

**`backend/config/middlewares.js`** — CORS env-driven:
```js
module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGINS', ['http://localhost:3000']),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

**`backend/config/server.js`** — thêm `url` để Strapi biết public URL (cần cho webhook/link generation):
```js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', ''),   // thêm dòng này
  app: { keys: env.array('APP_KEYS') },
  webhooks: { populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false) },
});
```

**`frontend/next.config.mjs`** — dynamic remotePatterns + standalone output:
```js
const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");

const nextConfig = {
  output: 'standalone',   // thêm dòng này cho Dockerfile
  images: {
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
      new URL("http://localhost:1337/uploads/**"),
    ],
  },
};

export default nextConfig;
```

### 6. `backend/.env.production.example` và `frontend/.env.production.example`

**Backend:**
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://api.yourdomain.com
APP_KEYS=<generate 4 giá trị base64>
API_TOKEN_SALT=<generate>
ADMIN_JWT_SECRET=<generate>
TRANSFER_TOKEN_SALT=<generate>
JWT_SECRET=<generate>
ENCRYPTION_KEY=<generate>
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=<generate strong password>
DATABASE_SSL=false
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```
> `DATABASE_SSL=false` vì Postgres chạy nội bộ trong Docker network (không expose ra ngoài).

**Frontend:**
```
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

---

## Bước bạn cần tự làm (không tự động hóa được)

1. **Oracle Console** — tạo VM Ampere A1:
   - Region: Singapore (ap-singapore-1) để gần VN
   - Shape: VM.Standard.A1.Flex → 4 OCPU, 24GB RAM
   - Image: Ubuntu 22.04 ARM64 (Minimal)
   - Boot volume: 200GB
   - Generate/download SSH key pair

2. **Oracle VCN Security List** — mở ingress rules:
   - TCP 22 (SSH, giới hạn IP của bạn nếu được)
   - TCP 80 (HTTP)
   - TCP 443 (HTTPS)

3. **Trong VM qua SSH** — mở iptables (hay bị bỏ sót, Oracle Ubuntu image block mặc định):
   ```bash
   sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
   sudo netfilter-persistent save
   ```

4. **Install Docker + Docker Compose** trên VM:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker ubuntu
   sudo apt install docker-compose-plugin -y
   ```

5. **Domain (nếu có)** — trỏ A record về Reserved Public IP của Oracle
   - `yourdomain.com` → Oracle IP
   - `api.yourdomain.com` → Oracle IP

---

## Deploy workflow (sau khi VM đã setup)

```bash
# Trên VM
git clone https://github.com/raynguyen256/Lennie-Strapi.git
cd Lennie-Strapi

# Copy env vars vào file thực (không commit file này)
cp backend/.env.production.example backend/.env.production
nano backend/.env.production   # điền secrets thực
cp frontend/.env.production.example frontend/.env.production

# Build và chạy
docker compose --env-file backend/.env.production up -d --build
```

**Update code sau này:**
```bash
git pull
docker compose up -d --build
```

---

## So sánh vs Phương án 1 (Render + Vercel + Neon)

| Tiêu chí | Phương án 1 | Phương án 2 (Oracle) |
|---|---|---|
| Chi phí | 0đ | 0đ |
| Cold-start | Có (~30-50s sau idle) | Không |
| RAM build | 512MB (rủi ro OOM) | 24GB (an toàn) |
| Media uploads | Ephemeral (cần Cloudinary) | Persistent (trên VM) |
| Ops effort | Thấp (PaaS) | Cao hơn (self-managed) |
| Latency tới VN | Cao (Render US) | Thấp (Oracle Singapore) |
| Setup time | ~30 phút | ~1-2 giờ |
| Rủi ro | Cold start cho khách | Oracle thu hồi VM (hiếm) |

**Kết luận:** Phương án 2 phù hợp hơn khi cần staging ổn định (demo được cho khách), Phương án 1 phù hợp hơn khi chỉ cần dev-test nhanh cho nội bộ.

---

## Verification

1. SSH vào VM, chạy `docker compose ps` → 4 services đều `Up`
2. Mở `https://yourdomain.com` → Next.js trang chủ load, không lỗi console
3. Mở `https://api.yourdomain.com/admin` → Strapi admin panel load
4. Upload 1 ảnh trong Strapi admin → file tồn tại tại `/var/lib/docker/volumes/..._strapi_uploads`
5. Tắt rồi bật lại VM → `docker compose ps` tự khởi động lại (cần `restart: unless-stopped` trong compose)
