FROM alpine:latest
# Atualização
RUN apk add --update nodejs
# Criação da pasta app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Instala as dependencias do app
COPY package.json /usr/src/app/
RUN npm install
# Copia a app
COPY . /usr/src/app
EXPOSE 8080
CMD ["node", "/usr/src/app/app.js"]