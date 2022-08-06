# Dock8s

## Docker commands

### Running docker 

#### Run normally
```shell
docker run hello-world
```

#### Use command inside docker image
```shell
docker run busybox echo hi there
docker run busybox ls
```

### See docker processes

We can see only running container using this
```shell
docker run busybox ping google.com
docker ps
```

#### See all containers ever created
```shell
docker ps  --all
```

### Create and start
create - creates a container, take filesystem snapshot and set up container
start - start running container

```shell
docker create hello-world
docker start -a <CONTAINER_ID>
```

`-a` - watch the output from container, and attach it to my terminal

once we started a container, and it exited. we can restart the container by
```shell
docker start -a <EXITED_CONTAINER_ID>
```

### Delete containers
```shell
docker system prune
docker ps --all
```

### Log data from container

Get logs of already running container
```shell
docker create busybox echo hi there
docker start <CONTAINER_ID>

docker logs <CONTAINER_ID>
```

### Stop running container

docker stop - send `SIGTERM` - graciously stop the container after closing all processes
docker kill - send `SIGKILL` - instantaneously kill the container

docker stop will wait 10s, eventually it well send `SIGKILL`

```shell
docker stop <CONTAINER_ID>
```

```shell
docker kill <CONTAINER_ID>
```

### Execute additional command inside container

```shell
docker exec -it <CONTAINER_ID> <COMMAND>
```
`-i` - whatever we type send it to STDIN of container cli
`-t` - show in formatted way


example to connect to redis-cli inside container
```shell
docker run redis
docker exec -it <CONTAINER_ID> redis-cli
```

### Open shell of docker cli

```shell
docker exec -it <CONTAINER_ID> sh
```

`sh` is a command processor. just like bash, powershell, zsh

We can also have docker run and attach shell
```shell
docker run -it busybox sh
```

---
## Custom docker image

```dockerfile
# use an existing docker image as a base
FROM alpine

# Download and install a dependency
RUN apk add --update redis

# Tell the image what to do when it starts as container
CMD ["redis-server"]
```

To build image, run
```shell
cd redis-image
docker build .
```

To tag a docker image while building
```shell
docker build -t <IMAGE_NAME> .
```

To build a container from some other dockerfile
```shell
docker build -f -t <IMAGE_NAME> .
```

---
## Running node js project

### Port mapping
```shell
docker run -p <HOST_PORT>:<CONTAINER_PORT> <IMAGE_NAME>
```

### Work directory
Directory inside container in reference to which docker image would run

```dockerfile
WORKDIR /usr/app
```

---
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

---
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