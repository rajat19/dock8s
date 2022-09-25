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
