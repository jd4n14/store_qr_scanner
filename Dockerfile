FROM node:lts-alpine3.18
RUN mkdir -p /usr/src/build
COPY ./api /usr/src/app/api
COPY ./app /usr/src/app/app
WORKDIR /usr/src/app
RUN cd api && npm install && npm run build
RUN cd app && npm install && npm run build

CMD [ "node", "api/dist/index.js"]