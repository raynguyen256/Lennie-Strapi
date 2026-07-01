# Step-by-Step Guide: Deploy Lennie SkinLab lên Oracle Cloud (Staging)

> Stack: Strapi v5 + Next.js 16 + Postgres + Caddy, chạy Docker Compose trên 1 VM AMD E5.Flex
> Dùng credit $400 SGD Oracle — cùng loại VM với instance goclaw đang chạy

---

## Tóm tắt hạ tầng sử dụng

| Resource | Spec | Ghi chú |
|---|---|---|
| VM.Standard.E5.Flex (AMD x86_64) | 1 OCPU / 12GB RAM | Tận dụng credit $400 SGD, dùng lại VCN goclaw |
| Boot volume | 100GB | Để dành credit, không cần 200GB cho staging |
| Public IP | 1 IP (auto-assign) | |
| Region | Singapore (ap-singapore-1) — cùng goclaw | |

> ⚠️ Shape này **ăn credit $400 SGD**, không phải Always Free. Khi credit hết hoặc hết hạn, instance sẽ bị dừng hoặc chuyển sang PAYG.
> 12GB RAM đủ thoải mái cho Strapi (~1GB) + Next.js (~512MB) + Postgres (~256MB) + Caddy + OS.

---

## PHẦN 1 — Chuẩn bị trước khi lên Oracle Console

### Bước 1.1 — Tạo SSH key pair (trên máy local)

Mở Terminal:

```bash
ssh-keygen -t ed25519 -C "lennie-oracle" -f ~/.ssh/lennie_oracle
```

Nhấn Enter 2 lần (bỏ trống passphrase nếu muốn không cần nhập mật khẩu mỗi lần SSH).

Kết quả tạo ra 2 file:
- `~/.ssh/lennie_oracle` — private key (giữ bí mật, không share)
- `~/.ssh/lennie_oracle.pub` — public key (paste lên Oracle)

Xem nội dung public key để copy:
```bash
cat ~/.ssh/lennie_oracle.pub
```

---

## PHẦN 2 — Tạo VM trên Oracle Cloud Console

### Bước 2.1 — Đăng nhập và vào trang tạo instance

1. Đăng nhập [cloud.oracle.com](https://cloud.oracle.com)
2. Góc trên trái: click menu **☰** → **Compute** → **Instances**
3. Chọn đúng **Compartment** (thường là root compartment khi mới tạo)
4. Click **Create Instance**

---

### Bước 2.2 — Cấu hình tên và availability domain

| Trường | Giá trị |
|---|---|
| Name | `lennie-stag` |
| Create in compartment | Để mặc định (root) |
| Availability domain | **AD-1** (E5.Flex không bị "Out of capacity" như A1) |

---

### Bước 2.3 — Chọn Image (OS)

1. Trong section **Image and shape**, click **Change image**
2. Chọn tab **Platform images**
3. Tìm và chọn: **Canonical Ubuntu**
4. Version: **22.04** (cùng version với goclaw để nhất quán)
5. Chọn image **x86_64** (mặc định, không cần aarch64 vì dùng AMD không phải ARM)
6. Click **Select image**

---

### Bước 2.4 — Chọn Shape (VM.Standard.E5.Flex)

1. Trong cùng section, click **Change shape**
2. Instance type: **Virtual machine**
3. Shape series: chọn **Intel** (hoặc **AMD** tùy UI — E5 là Intel Flex)
4. Chọn **VM.Standard.E5.Flex**
5. Nhập:
   - **Number of OCPUs**: `1`
   - **Amount of memory (GB)**: `12`

> Cùng cấu hình với goclaw instance. OCPU thấp hơn để tiết kiệm credit — 1 OCPU đủ cho staging Strapi + Next.js.

6. Click **Select shape**

---

### Bước 2.5 — Cấu hình Networking (dùng lại VCN goclaw)

1. Trong section **Networking**, chọn **Select existing virtual cloud network**
2. Chọn VCN: **goclaw** (VCN đã tạo cho instance goclaw)
3. Subnet: chọn **public subnet** trong VCN goclaw
4. Đảm bảo **Assign a public IPv4 address** được bật (**ON**)

> Dùng lại VCN goclaw giúp tận dụng Security List đã cấu hình (port 80/443 đã mở). Instance `lennie-stag` sẽ có Public IP riêng, không đụng goclaw.
> **Lỗi toggle bị kẹt OFF:** Nếu toggle "Assign public IPv4" không bật được, bỏ qua — tạo VM xong rồi gắn Reserved IP sau (xem Bước 2.7).

---

### Bước 2.6 — Thêm SSH Key

1. Section **Add SSH keys**, chọn **Paste public keys**
2. Paste toàn bộ nội dung file `~/.ssh/lennie_oracle.pub` vào ô

---

### Bước 2.7 — Cấu hình Boot Volume

1. Section **Boot volume**
2. **Boot volume size**: `100` GB (đủ cho staging, tiết kiệm credit so với 200GB)
3. Để VPUs/encryption mặc định

Click **Create** để tạo instance.

> Instance sẽ ở trạng thái **Provisioning** (màu vàng) trong ~2-3 phút rồi chuyển sang **Running** (màu xanh).

---

### Bước 2.7 — (Nếu cần) Gắn Reserved Public IP

Nếu instance không có public IP sau khi tạo:

1. Menu **☰** → **Networking** → **IP Management** → **Reserved public IPs**
2. Click **Reserve public IP** → đặt tên → **Reserve**
3. Quay lại instance → **Attached VNICs** → chọn VNIC primary → **IP Addresses**
4. Chọn IP private đang có → **Edit** → gắn Reserved IP vừa tạo vào

---

## PHẦN 3 — Mở Ports (2 lớp bắt buộc)

> Oracle chặn traffic ở **2 lớp độc lập**: VCN Security List (cloud-level) VÀ iptables trong OS. Phải mở cả 2 — đây là lỗi hay gặp nhất khi deploy trên Oracle.

### Bước 3.1 — Mở ports trong VCN Security List (cloud-level)

1. Menu **☰** → **Networking** → **Virtual Cloud Networks**
2. Click vào VCN vừa tạo (`vcn-lennie`)
3. Click **Security Lists** → chọn **Default Security List**
4. Click **Add Ingress Rules** và thêm rule sau (có thể thêm 2 port trong 1 rule):

| Trường | Giá trị |
|---|---|
| Source Type | CIDR |
| Source CIDR | `0.0.0.0/0` |
| IP Protocol | TCP |
| Destination Port Range | `80,443` |
| Description | HTTP and HTTPS |

5. Click **Add Ingress Rules**

> Port 22 (SSH) đã được mở mặc định khi tạo VCN mới — không cần thêm.

---

### Bước 3.2 — Mở ports trong iptables (OS-level)

SSH vào VM trước:

```bash
ssh -i ~/.ssh/lennie_oracle ubuntu@<PUBLIC_IP_CUA_VM>
```

Sau khi vào trong VM, chỉnh file iptables rules:

```bash
sudo nano /etc/iptables/rules.v4
```

Tìm dòng có nội dung như sau (dòng REJECT cuối cùng):
```
-A INPUT -j REJECT --reject-with icmp-host-prohibited
```

Thêm 2 dòng **TRƯỚC** dòng REJECT đó:

```
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
```

> **Quan trọng:** Phải thêm TRƯỚC dòng REJECT, không thêm sau — iptables đọc rules theo thứ tự, REJECT ở trước sẽ block hết.

Lưu file (Ctrl+O → Enter → Ctrl+X), sau đó apply:

```bash
sudo iptables-restore < /etc/iptables/rules.v4
```

Nếu chưa có `iptables-persistent`, cài và lưu:

```bash
sudo apt-get install -y iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
```

Kiểm tra rules đã apply:
```bash
sudo iptables -L INPUT --line-numbers | grep -E '(80|443|REJECT)'
```

---

## PHẦN 4 — Cài đặt Docker trên VM

```bash
# Cài Docker
curl -fsSL https://get.docker.com | sh

# Cho phép user ubuntu chạy docker không cần sudo
sudo usermod -aG docker ubuntu

# Đăng xuất và đăng nhập lại để group có hiệu lực
exit
```

SSH vào lại, kiểm tra:
```bash
docker --version
docker compose version
```

---

## PHẦN 5 — Deploy ứng dụng

### Bước 5.1 — Clone repo

```bash
git clone https://github.com/raynguyen256/Lennie-Strapi.git
cd Lennie-Strapi
```

### Bước 5.2 — Tạo file .env production cho backend

```bash
cp backend/.env.production.example backend/.env.production
nano backend/.env.production
```

Điền đầy đủ các giá trị — generate secrets mới bằng lệnh sau (chạy nhiều lần cho từng secret):

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Mẫu `.env.production` hoàn chỉnh:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://api.yourdomain.com

APP_KEYS=<base64_1>,<base64_2>,<base64_3>,<base64_4>
API_TOKEN_SALT=<base64>
ADMIN_JWT_SECRET=<base64>
TRANSFER_TOKEN_SALT=<base64>
JWT_SECRET=<base64>
ENCRYPTION_KEY=<base64>

DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=<mật_khẩu_mạnh>
DATABASE_SSL=false

CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

> `DATABASE_HOST=postgres` — tên service trong Docker Compose, không phải localhost.

### Bước 5.3 — Tạo file .env production cho frontend

```bash
cp frontend/.env.production.example frontend/.env.production
nano frontend/.env.production
```

```
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

### Bước 5.4 — (Nếu chưa có domain) Dùng IP tạm thời

Nếu chưa có domain, cập nhật Caddyfile để dùng IP trực tiếp (HTTP, không có HTTPS):

```
:80 {
    handle /api/* {
        reverse_proxy strapi:1337
    }
    handle /uploads/* {
        reverse_proxy strapi:1337
    }
    handle /admin/* {
        reverse_proxy strapi:1337
    }
    handle {
        reverse_proxy nextjs:3000
    }
}
```

Và `.env.production` frontend:
```
NEXT_PUBLIC_STRAPI_URL=http://<PUBLIC_IP>
```

### Bước 5.5 — Build và khởi động

```bash
docker compose --env-file backend/.env.production up -d --build
```

Lần đầu sẽ mất 5-10 phút (build Docker images). Theo dõi tiến trình:

```bash
docker compose logs -f
```

---

## PHẦN 6 — Gắn subdomain từ Mắt Bão (Staging Server)

Dùng **subdomain riêng** cho staging thay vì domain chính — giữ domain chính cho production sau này, staging chạy song song không ảnh hưởng.

Ví dụ quy ước đặt tên subdomain staging:
- `staging.yourdomain.com` → Next.js frontend
- `api-staging.yourdomain.com` → Strapi backend + admin panel

---

### Bước 6.1 — Thêm A records trong Mắt Bão DNS

1. Đăng nhập [account.matbao.net](https://account.matbao.net) bằng tài khoản đã mua domain
2. Chọn **Tên miền** → chọn domain cần thêm subdomain
3. Click **Quản lý DNS** (hoặc **DNS Management**)
4. Chọn tab **Bản ghi DNS** / **DNS Records**
5. Thêm **2 bản ghi A** mới:

**Bản ghi 1 — Frontend (Next.js):**

| Trường | Giá trị |
|---|---|
| Loại bản ghi | `A` |
| Tên máy chủ / Host | `staging` |
| Địa chỉ IP / Points to | `<PUBLIC_IP_ORACLE_VM>` |
| TTL | `300` (hoặc để mặc định) |

**Bản ghi 2 — Backend (Strapi):**

| Trường | Giá trị |
|---|---|
| Loại bản ghi | `A` |
| Tên máy chủ / Host | `api-staging` |
| Địa chỉ IP / Points to | `<PUBLIC_IP_ORACLE_VM>` |
| TTL | `300` |

6. Click **Lưu** / **Save** sau mỗi bản ghi
7. Đợi DNS propagate: thường **5-15 phút** với TTL=300, có thể kiểm tra bằng:

```bash
# Chạy trên máy local, không phải VM
nslookup staging.yourdomain.com
nslookup api-staging.yourdomain.com
# Kết quả phải trả về PUBLIC_IP_ORACLE
```

---

### Bước 6.2 — Cập nhật Caddyfile với subdomain staging

Sửa file `Caddyfile` trong repo (tại root):

```
api-staging.yourdomain.com {
    reverse_proxy strapi:1337
}

staging.yourdomain.com {
    reverse_proxy nextjs:3000
}
```

Caddy tự động xin SSL certificate từ Let's Encrypt cho cả 2 subdomain — không cần cài certbot hay làm thêm gì.

> **Điều kiện để Caddy cấp SSL được:** DNS phải đã propagate và port 80/443 đã mở (Phần 3). Caddy sẽ tự thử cấp cert khi nhận request đầu tiên.

---

### Bước 6.3 — Cập nhật .env và redeploy

Trên VM, cập nhật lại 2 file env với subdomain thực:

```bash
nano backend/.env.production
```

Cập nhật 2 dòng:
```
PUBLIC_URL=https://api-staging.yourdomain.com
CORS_ORIGINS=https://staging.yourdomain.com,http://localhost:3000
```

```bash
nano frontend/.env.production
```

Cập nhật:
```
NEXT_PUBLIC_STRAPI_URL=https://api-staging.yourdomain.com
```

Rebuild và restart:
```bash
docker compose --env-file backend/.env.production up -d --build
```

---

## PHẦN 7 — Kiểm tra hoạt động

```bash
# Kiểm tra tất cả 4 services đang Up
docker compose ps

# Xem logs nếu có lỗi
docker compose logs strapi
docker compose logs nextjs
docker compose logs caddy
```

Kiểm tra trên trình duyệt:
- `https://staging.yourdomain.com` → Next.js trang chủ load, có HTTPS ✓
- `https://api-staging.yourdomain.com/admin` → Strapi admin panel ✓
- `https://api-staging.yourdomain.com/api/services` → JSON response ✓
- DevTools Console → không có lỗi CORS khi gọi API ✓
- Upload 1 ảnh trong Strapi admin → ảnh hiển thị trên frontend ✓

---

## PHẦN 8 — Workflow cập nhật code (sau khi deploy lần đầu)

Khi có code mới push lên GitHub:

```bash
# SSH vào VM
ssh -i ~/.ssh/lennie_oracle ubuntu@<PUBLIC_IP>

# Pull code mới và rebuild
cd Lennie-Strapi
git pull
docker compose --env-file backend/.env.production up -d --build
```

---

## PHẦN 9 — Tự động khởi động lại khi VM reboot

Docker Compose services đã được cấu hình `restart: unless-stopped` trong `docker-compose.yml` — sẽ tự start lại sau khi VM reboot. Kiểm tra bằng cách:

```bash
sudo reboot
# Sau ~1 phút SSH lại
docker compose ps   # tất cả phải ở trạng thái Up
```

---

## Troubleshooting thường gặp

| Vấn đề | Nguyên nhân | Giải pháp |
|---|---|---|
| Web không truy cập được dù VM đang chạy | Quên mở iptables (Bước 3.2) | Kiểm tra `sudo iptables -L INPUT` |
| "Out of host capacity" khi tạo VM | Oracle region đầy | Thử AD-1 → AD-2 → AD-3, hoặc đổi region |
| Strapi build thất bại (lần đầu) | Postgres chưa kịp ready | Chạy `docker compose restart strapi` |
| Caddy không cấp SSL | DNS chưa propagate | Đợi 5-10 phút sau khi set A record |
| Container crash sau khi start | Sai DATABASE_PASSWORD hoặc SECRET | Kiểm tra `docker compose logs strapi` |

---

## Ghi chú quan trọng

- **Always Free = home region only** — VM phải tạo ở region đăng ký tài khoản ban đầu (hoặc region bạn set làm home region)
- **Backup:** Oracle cung cấp 5 boot volume backup free — nên tạo 1 backup sau khi setup xong
- **File `.env.production` không được commit vào git** (đã có trong `.gitignore`)
- **Nếu Oracle thu hồi instance** (hiếm, thường do không hoạt động 60+ ngày): tạo lại VM, clone repo, điền lại .env — Postgres data trong Docker volume sẽ mất nếu không backup

---

Sources:
- [Always Free Resources - Oracle Docs](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [How to Open Ports 80 and 443 on Oracle Cloud - Marcin Mitruk](https://marcinmitruk.link/posts/how-to-open-ports-80-and-443-on-an-oracle-cloud-instance/)
- [Oracle Quietly Cuts Free Tier Ampere A1 in Half - Linuxiac](https://linuxiac.com/oracle-quietly-cuts-free-tier-ampere-a1-resources-in-half/)
- [Oracle Cloud ARM Server Setup - Dynzen](https://www.dynzen.com/en/oracle-cloud-arm-server/)
