FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./
# /app/package.json
# /app/package-lock.json

RUN npm install

RUN ls -la
COPY . .
# /app/...

RUN ls -la

RUN npm run build

RUN ls -la

FROM node:23-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json /app

RUN cd ./dist && ls -la

# /app/dist → /app/dist
  # sem src
# /app/package.json → /app/package.json
# /app/package-lock.json → /app/package-lock.json

RUN npm install --production

CMD ["node", "./dist/server.js"]



