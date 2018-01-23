FROM node:8.9.4-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ARG env=prod
RUN npm run build -- --prod --environment $env

FROM nginx:stable-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY ./.continuous-delivery/nginx.conf /etc/nginx/conf.d/default.conf
