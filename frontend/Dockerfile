FROM node:14-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# /app/build <-- contains all build material

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
