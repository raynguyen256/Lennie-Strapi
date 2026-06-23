FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
