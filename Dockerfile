FROM node:12.16-alpine

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm ci --quiet --only-production
COPY . .

CMD [ "npm", "start" ]
