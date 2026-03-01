# 多阶段构建 - 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制所有 package.json 文件（包括 monorepo 子包）
COPY package.json pnpm-lock.yaml* ./
COPY server/package.json ./server/

# 安装 pnpm 和 Node.js 构建工具
RUN npm install -g pnpm && \
    apk add --no-cache python3 make g++ && \
    pnpm config set registry https://registry.npmmirror.com

# 安装所有依赖（根据 package.json 自动生成 lockfile，不使用 --frozen-lockfile）
RUN pnpm install

# 显式安装 Alpine Linux (musl) 特定的 Taro binding 模块
RUN pnpm add @tarojs/binding-linux-x64-musl --save-exact

# 安装 NestJS CLI（使用兼容 Node 18 的版本）
RUN pnpm add -D @nestjs/cli@10.4.9

# 确保 NestJS CLI 在全局可用（用于执行 nest build 命令）
RUN npx @nestjs/cli@10.4.9 --version || pnpm add -g @nestjs/cli@10.4.9

# 复制源代码
COPY . .

# 构建 TypeScript
RUN pnpm run build

# 生产阶段
FROM node:18-alpine AS production

# 设置 Node 环境变量
ENV NODE_ENV=production

# 设置工作目录
WORKDIR /app

# 从构建阶段复制依赖和构建产物
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# 创建抖音云平台要求的启动脚本
RUN echo '#!/bin/sh' > /app/run.sh && \
    echo 'set -e' >> /app/run.sh && \
    echo '' >> /app/run.sh && \
    echo 'cd /app' >> /app/run.sh && \
    echo 'node dist/main.js' >> /app/run.sh && \
    chmod +x /app/run.sh && \
    mkdir -p /opt/application && \
    cp /app/run.sh /opt/application/run.sh && \
    chmod +x /opt/application/run.sh

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动应用
CMD ["node", "dist/main.js"]
