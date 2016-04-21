FROM node:5.10.1
MAINTAINER openJT
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY . /usr/src/app/
RUN npm install
RUN npm install -g gulp
RUN gulp bower
RUN gulp prod
WORKDIR /usr/src/app/build/
EXPOSE 8080
CMD ["npm", "start"]