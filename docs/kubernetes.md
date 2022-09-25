## Kubernetes

### Pod file
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: client-pod
  labels:
    component: web
spec:
  containers:
    - name: client
      image: stephengrider/multi-client
      ports:
        - containerPort: 3000
```


### Service file
```yaml
apiVersion: v1
kind: Service
metadata:
  name: client-node-port
spec:
  type: NodePort
  ports:
    - port: 3050
      targetPort: 3000
      nodePort: 31515
  selector:
    component: web
```
* selector: some unique identification key value
* port: port that other pods see, for inter pod communication
* nodePort: we type in browser, random b/w 30000-32767
* targetPort: container port


### Running containers
#### Run yaml files
```shell
kubectl apply -f <FILENAME>
```

#### Print status
```shell
kubectl get pods
kubectl get services
```

### Object Types

| Object Type | Definition                                  |
|-------------|---------------------------------------------|
| Pods        | Runs one or more closely related containers |
| Services    | Sets up networking in a kubernetes cluster  |

### Service Object Types

| Service      | Definition                                                              |
|--------------|-------------------------------------------------------------------------|
| ClusterIP    ||
| NodePort     | Exposes a container to the outside world (only good for dev purposes!!) |
| LoadBalancer ||
| Ingress      ||