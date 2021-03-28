FROM node:10 AS builder
WORKDIR /app
COPY . .
RUN npm install --only=production

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["node", "main"] 