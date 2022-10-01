## K8s commands
### Run yaml files
```
kubectl apply -f <FILENAME>
```
example-
```shell
kubectl apply -f client-pod.yaml
kubectl apply -f client-node-port.yaml
kubectl apply -f client-deployment.yaml
```

To start all services from configs in some particular folder
```shell
kubectl apply -f my_folder
```

### Print status
```shell
kubectl get pods
```
```
NAME                                 READY   STATUS    RESTARTS   AGE
client-deployment-576bc76988-6gnqb   1/1     Running   0          6m
```

```shell
kubectl get services
```
```
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
client-node-port   NodePort    10.102.134.12   <none>        3050:31515/TCP   94m
kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP          120m
```

```shell
kubectl get deployments
```
```
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
client-deployment   1/1     1            1           5m
```

```shell
kubectl get pods -o wide
```
```
NAME                                 READY   STATUS    RESTARTS   AGE     IP         NODE             NOMINATED NODE   READINESS GATES
client-deployment-576bc76988-6gnqb   1/1     Running   0          2m24s   10.1.0.7   docker-desktop   <none>           <none>
```

### Get details of object
```shell
kubectl describe <OBJECT_TYPE> <OBJECT_NAME>
```
example-
```shell
kubectl describe pod
kubectl describe pod client-pod
```

### Delete an object (Imperative)
```shell
kubectl delete -f <CONFIG_FILE>
```
example-
```shell
kubectl delete -f client-pod.yaml
```

### Update image 
```
kubectl set image <OBJECT_TYPE>/<OBJECT_NAME> <CONTAINER_NAME> = <NEW_IMAGE_TO_USE>
```
example-
#### Build and Publish image
```shell
docker build -t evilninja/dock8s-multi-client:v2
docker push evilninja/dock8s-multi-client:v2
```

#### Set image
```shell
kubectl set image deployment/client-deployment client=evilninja/dock8s-multi-client:v2
```

### Storage class

To get storage class details
```shell
 kubectl get storageclass
```

This results in something similar (for local)
```
NAME                 PROVISIONER          RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
hostpath (default)   docker.io/hostpath   Delete          Immediate           false                  6d
```

### Creating a secret file
```
kubectl create secret generic <SECRET_NAME> --from-literal key=value
```
- **create** - Imperative command to create a new object
- **secret** - Type of object we are going to create
- **generic** - Type of secret
- **<SECRET_NAME>** - Name of secret for later reference in a pod config
- **--from-literal** - We are going to add the secret info int this command, as opposed to from a file
- **key=value** - Key-value pair of secret information

Example:
```shell
kubectl create secret generic pgpassword --from-literal PG_PASSWORD=12345
```

To see secrets list
```shell
kubectl get secrets
```
```
NAME         TYPE     DATA   AGE
pgpassword   Opaque   1      9s
```