## Kubernetes

- Kubernetes is a system to deploy containerized apps
- **Nodes** are individual machines(or vm's) that run containers
- **Masters** are machines with a set of programs to manage nodes
- Kubernetes didn't build our images - it got them from somewhere else
- Kubernetes(the master) decided where to run each container - each node can run a dissimilar set of containers
- To deploy something, we update the desired state of the master with a config file
- The master works constantly to meet your desired state

### Object Types

| Object Type | Definition                                                                                                     |
|-------------|----------------------------------------------------------------------------------------------------------------|
| Pods        | Runs one or more closely related containers                                                                    |
| Services    | Sets up networking in a kubernetes cluster                                                                     |
| Deployment  | Maintains a set of identical pods, ensuring that they have the correct config and that the right number exists |

### Service Object Types

| Service      | Definition                                                              |
|--------------|-------------------------------------------------------------------------|
| ClusterIP    | Exposes a set of pods to other objects in the cluster                   |
| NodePort     | Exposes a container to the outside world (only good for dev purposes!!) |
| LoadBalancer ||
| Ingress      ||

---
### Files
#### Pod file
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

#### Service file
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
- selector: some unique identification key value 
- port: port that other pods see, for inter pod communication 
- nodePort: we type in browser, random b/w 30000-32767 
- targetPort: container port

#### Deployment file
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: client-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: web
  template:
    metadata:
      labels:
        component: web
    spec:
      containers:
        - name: client
          image: stephengrider/multi-client
          ports:
            - containerPort: 3000
```
- template: similar to pod spec
- replicas: no. of different pods it has to make, running exact template

---
### Volumes (K8s)

Volume: An object that allow a container to store data at the pod level.

_Note: Not exactly the same thing as a Docker volume_

A persistent volume is stored outside the pod, and if the pod is even deleted, then also a new pod will be able to access existing data