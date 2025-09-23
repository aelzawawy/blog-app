FROM node:16-alpine

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@8.0.0
Run pnpm i

COPY ./ ./

CMD ["pnpm", "start:dev"]