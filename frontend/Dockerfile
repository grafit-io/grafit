FROM node:8.12.0-alpine as base

LABEL Name=grafit-frontend-dev Version=0.0.1
EXPOSE 3000

COPY . /usr/src/grafit
WORKDIR /usr/src/grafit

# If you are building your code for production
# RUN npm install --only=production
RUN npm install
CMD [ "npm", "start" ]


FROM base as build
RUN npm run build


FROM nginx:1.15.5-alpine as prod

# remove default confs
RUN rm /etc/nginx/conf.d/default.conf

LABEL Name=grafit-frontend Version=0.0.1
EXPOSE 80

COPY --from=build /usr/src/grafit/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# test nginx config
RUN nginx -t