FROM node:8.12.0-alpine

LABEL Name=grafit-frontend Version=0.0.1
EXPOSE 3000

COPY . /usr/src/grafit
WORKDIR /usr/src/grafit

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

CMD [ "npm", "start" ]
