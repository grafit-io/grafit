FROM node:8.12.0-alpine

LABEL Name=grafit-frontend Version=0.0.1
EXPOSE 3000

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

COPY . /usr/src/grafit
WORKDIR /usr/src/grafit

CMD [ "npm", "start" ]