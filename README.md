![Forks](https://img.shields.io/badge/forks-44-blue)
![Stars](https://img.shields.io/badge/stars-13-yellow)
## Build app demo

`cd source
docker build -t demo-app:1.0.0 .`

## Deploy Postgresql & Redis with manifest:
`kubectl apply -f k8s-deployment/database`

Postgresql:
- user/pass: demo-use/postgres_pass 
- database name: demo-database

## To render out YAML manifest:
Run command: `helm template <name-app> ./k8s-deployment/app-demo > ./verify.yaml`

Note: Declare a namespace when deploying the chart.

## LivenessProbe, readinessProbe, and startupProbe
An explanation of the livenessProbe, readinessProbe, and startupProbe configuration for the application:
1. LivenessProbe:
- httpGet: It performs an HTTP GET request to the /healthz endpoint of the application container on port 3000.
- initialDelaySeconds: It specifies the number of seconds to wait before starting the liveness probe. In this case, it waits for 15 seconds after the container starts.
periodSeconds: It sets the time interval between consecutive liveness probe checks. Here, it checks every 10 seconds.
- failureThreshold: It defines the number of consecutive probe failures before considering the container as unhealthy. In this case, if the probe fails for 5 consecutive times, the container is restarted.

2. ReadinessProbe:
- exec: It executes a command inside the container to check its readiness state. Here, it runs a command to connect to a PostgreSQL database using the values provided through environment variables.
- initialDelaySeconds: It specifies the initial delay before starting the readiness probe. It waits for 10 seconds after the container starts.
periodSeconds: It sets the time interval between consecutive readiness probe checks. In this case, it checks every 5 seconds.
- failureThreshold: It defines the number of consecutive probe failures before considering the container as not ready. If the probe fails for 3 consecutive times, the container is marked as not ready.

3. StartupProbe:
- httpGet: It performs an HTTP GET request to the root path (/) of the application container on port 3000.
- initialDelaySeconds: It specifies the delay before starting the startup probe. It waits for 30 seconds after the container starts.
- periodSeconds: It sets the time interval between consecutive startup probe checks. Here, it checks every 15 seconds.
- failureThreshold: It defines the number of consecutive probe failures during startup. If the probe fails for 10 consecutive times, the container is restarted. This probe is specifically used during the startup phase to delay the readiness of the container until it is fully up and running.


