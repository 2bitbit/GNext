# --- 阶段 1: 构建环境 ---
# 使用官方的 Go 镜像作为临时的构建环境 (基于 Alpine Linux，体积更小)
FROM golang:1.25-alpine AS builder

# 设置工作目录
WORKDIR /app

# 拷贝 go.mod 和 go.sum 文件，并提前下载依赖，可以利用 Docker 的缓存机制
COPY go.mod go.sum ./
RUN go mod download

# 拷贝所有源代码
COPY . .

# 编译 Go 应用，创建静态链接的二进制文件--生成二进制文件
RUN CGO_ENABLED=0 GOOS=linux go build -o /gnext-backend .


# --- 阶段 2: 运行环境 ---
# 使用一个极简的 alpine 镜像作为最终的运行环境
FROM alpine:latest

# 设置工作目录
WORKDIR /

# 从"builder"阶段只拷贝编译好的二进制文件，不拷贝任何源代码或工具--只拷贝二进制文件
COPY --from=builder /gnext-backend /gnext-backend

# 声明容器将监听的端口
EXPOSE 8080

# 容器启动时要执行的命令--执行编译好的二进制文件
CMD ["/gnext-backend"]
