## Skaffold

Skaffold is a command line tool that facilitates continuous development for Kubernetes-native applications. 
Skaffold handles the workflow for building, pushing, and deploying your application, and provides building blocks for creating CI/CD pipelines. 
This enables you to focus on iterating on your application locally while Skaffold continuously deploys to your local or remote Kubernetes cluster.

### Setting up
For macOS
```shell
brew install skaffold
```

Check if installed using
```shell
skaffold version
```

### Running skaffold config
```shell
skaffold dev
```

### Skaffold.yaml

Reference: https://skaffold.dev/docs/references/yaml

_Note: Don't add persistent services (databases) in deploy manifests, as these should not be closed when skaffold is shutdown_

Example-
```yaml
apiVersion: skaffold/v2beta12
kind: Config
deploy:
  kubectl:
    manifests:
      # don't add persistent services like database
      - ./k8s/client-deployment.yaml
      - ./k8s/server-deployment.yaml
      - ./k8s/worker-deployment.yaml
      - ./k8s/client-cluster-ip-service.yaml
      - ./k8s/client-cluster-ip-service.yaml
build:
  local:
    push: false
  artifacts:
    - image: evilninja/dock8s-multi-client
      context: client
      docker:
        dockerfile: Dockerfile.dev
      sync:
        manual:
          - src: 'src/**/*.js'
            dest: .
          - src: 'src/**/*.css'
            dest: .
          - src: 'src/**/*.html'
            dest: .
    - image: evilninja/dock8s-multi-worker
      context: worker
      docker: 
        dockerfile: Dockerfile.dev
      sync:
        manual:
          - src: '*.js'
            dest: .
    - image: evilninja/dock8s-multi-server
      context: server
      docker:
        dockerfile: Dockerfile.dev
      sync:
        manual:
          - src: '*.js'
            dest: .
```