FROM node:16-alpine

ARG BUILD_TYPE="dev"
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build:packages
RUN npm run build -- filter=./projects/wp-nextjs
