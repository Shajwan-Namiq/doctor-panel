# Choose the Image which has Node installed already
FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i pkg@5.8.0
RUN npm ci
# RUN npm i -D import-meta-env-unplugin-test.tgz
COPY . .
RUN npm run build
RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js -t node18-alpine -o import-meta-env


FROM nginx:stable-alpine
RUN mkdir /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/import-meta-env /app/import-meta-env

COPY .env.example /app/.env.example
COPY start.sh /app/start.sh
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["sh","/app/start.sh"]

# COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf    
# COPY --from=builder /app/node_modules/cra-envs/package.json ./cra-envs-package.json

# RUN npm i -g cra-envs@`node -e 'console.log(require("./cra-envs-package.json")["version"])'`

# WORKDIR /usr/share/nginx
# COPY --from=builder /app/dist ./html
# COPY --from=builder /app/.env .
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/dist/index.html ./public/
# ENTRYPOINT sh -c "npx embed-environnement-variables && nginx -g 'daemon off;'"
