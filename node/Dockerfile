FROM node:lts-alpine3.16

WORKDIR /node
COPY ./mmarket/package.json .

RUN npm install
# RUN npm install -g nodemon
CMD [ "node", "mmarket/index.js"]