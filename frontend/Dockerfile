# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Этап продакшена
FROM node:20-alpine AS runner

COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY package-lock.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "preview"]
