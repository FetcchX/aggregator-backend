FROM node:16

ARG SETTINGS

ENV MICROSERVICE=/home/app/microservice/
ENV SETTINGS=${SETTINGS}

RUN mkdir -p $MICROSERVICE

WORKDIR $MICROSERVICE

EXPOSE 5000

COPY package.json ./

RUN ls
RUN npm install


COPY . .
# RUN rm -rf node_modules/ dist/
RUN npm run build

CMD [ "npm", "run", "start" ]