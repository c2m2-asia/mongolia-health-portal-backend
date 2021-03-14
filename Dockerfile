From node:12.18.0

# Install cron
RUN apt-get update && apt-get install -y cron
RUN apt-get -y install postgresql-client

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install 

# Bundle app source
COPY . .

EXPOSE 8080
RUN npm install -g nodemon sequelize-cli
RUN npm run apidocs

RUN mkdir -p /usr/src/app/logs

CMD npm run start