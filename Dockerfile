FROM node:18-alpine AS builder

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /var/www/production

COPY --from=builder /var/www/app/package.json /var/www/app/package-lock.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/server.js ./

EXPOSE 3000

CMD ["node", "./server.js"]
