# build stage
FROM node:latest
WORKDIR ../../apps/node/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4040
CMD ["npm", "start"]
RUN npm run build