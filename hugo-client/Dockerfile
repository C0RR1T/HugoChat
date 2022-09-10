FROM node:18 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]