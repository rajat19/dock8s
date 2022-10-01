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

### Start ingress-nginx object
Documentation: [Doc](https://kubernetes.github.io/ingress-nginx/deploy/)

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml
```

There might be some issues accessing ingress service locally on port 80. 
Try following to forward port to 80, and access localhost:8080 now
```shell
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

---
### Kubernetes Dashboard

1. Grab the most current script from the [install](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui) instructions
   As of today, the kubectl apply command looks like this:
    ```shell
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml
    ```

2. Create a `dash-admin-user.yaml` file and paste the following:
    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: admin-user
      namespace: kubernetes-dashboard
    ```
   
3. Apply the `dash-admin-user` configuration:
   ```shell
    kubectl apply -f dash-admin-user.yaml
   ```

4. Create `dash-cluster-role.yaml` file and paste the following:
    ```yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: admin-user
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: cluster-admin
    subjects:
      - kind: ServiceAccount
        name: admin-user
        namespace: kubernetes-dashboard
    ```

5. Apply the ClusterRole configuration:
   ```shell
   kubectl apply -f dash-cluster-role.yaml
   ```

6. In the terminal, run 
   ```shell
    kubectl proxy
   ```

7. Visit the [URL](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/) in your browser to access your Dashboard

8. Obtain the token for user by running the following in your terminal:
    First, run `kubectl version` in your terminal.

    If your Kubernetes server version is v1.24 or higher you must run the following command:
    ```shell
    kubectl -n kubernetes-dashboard create token admin-user
    ```

9. Copy the token from the above output and use it to log in at the dashboard.
   Be careful not to copy any extra spaces or output such as the trailing % you may see in your terminal.

10. After a successful login, you should now be redirected to the Kubernetes Dashboard.

