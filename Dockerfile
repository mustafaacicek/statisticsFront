FROM node:18-alpine AS build-env

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build-env /app/dist/test/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
