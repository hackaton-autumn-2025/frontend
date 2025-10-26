# ==== СТАДИЯ 1: Сборка приложения ====
FROM node:18-alpine AS builder

# Рабочая директория
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Сборка проекта (папка dist)
RUN npm run build


# ==== СТАДИЯ 2: Сервер для продакшена ====
FROM nginx:1.27-alpine

# Удаляем дефолтный конфиг и копируем свой (по желанию)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение в директорию, обслуживаемую nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Команда запуска nginx
CMD ["nginx", "-g", "daemon off;"]
