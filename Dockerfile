# ---- Base Stage ----
FROM node:22-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
FROM base AS deps
COPY package*.json ./
RUN npm install --omit=dev

# ---- Build Stage ----
FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/server.js"]