## Docker compose

```yaml
version: '3'
services:
  redis-server:
    image: 'redis'
  node-app:
    build: .
    ports:
      - "4000:8080"
```

### Build and Run
```shell
docker-compose up --build
```

### Only run
```shell
docker-compose up
```

### Run in background
```shell
docker-compose up -d
```

### Destroy all containers
```shell
docker-compose down
```

---
## Restart policies

| Type           | Description                                                           |
|----------------|-----------------------------------------------------------------------|
| 'no'           | Never attempt to restart this container if it stops or crashes        |
| always         | If this container stops "for any reason" always attempt to restart it |
| on-failure     | Only restart if the container stops with an error code                |
| unless-stopped | Always restart unless we (the developers) forcibly stop it            |