# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app/spa
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/spa/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]