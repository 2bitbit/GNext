# --- 阶段 1: 构建环境 ---
FROM node:22-alpine AS builder
WORKDIR /app

# 拷贝 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 拷贝所有源代码
COPY . .

# 声明一个构建时参数，我们将从 docker-compose 中传入这个值
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# 执行生产构建，这会使用上面的环境变量
RUN npm run build

# --- 阶段 2: 运行环境 ---
FROM node:22-alpine
WORKDIR /app

# 从"builder"阶段拷贝构建好的应用和生产环境必要的依赖
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# 声明容器将监听的端口
EXPOSE 3000

# 容器启动时运行的命令
CMD ["npm", "start"]
