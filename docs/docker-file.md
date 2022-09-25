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