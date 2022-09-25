## Docker volumes

Set mapping to root project
```shell
docker run -p 3000:3000 -v /app/node_modules -v ${pwd}:/app <IMAGE_ID>
```

where `pwd` - is present working directory

For docker-compose.yml
```yaml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
```