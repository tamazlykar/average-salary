#!/bin/bash

set -e

# Get crediantials and auth to gcloud
echo $GCLOUD_SERVICE_KEY | base64 --decode --ignore-garbage > $GOOGLE_APPLICATION_CREDENTIALS
gcloud auth activate-service-account --key-file $GOOGLE_APPLICATION_CREDENTIALS

# Set project, zone and get-credientials for kubectl
gcloud --quiet config set project $PROJECT_ID
gcloud --quiet config set compute/zone $COMPUTE_ZONE
gcloud --quiet container clusters get-credentials $CLUSTER_NAME

# Build and push Docker image to Google Container Registry
docker build -t gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}:${TRAVIS_COMMIT} .
gcloud docker -- push gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}:${TRAVIS_COMMIT}

# Change image in deployments.yaml
sed -i "s#gcr.io#gcr.io/${PROJECT_ID}/${DOCKER_IMAGE_NAME}:${TRAVIS_COMMIT}#g" ./k8s/deployment.yaml

# Create/update deployment and service on k8s
kubectl apply -f ./.continuous-delivery/k8s/deployment.yaml
kubectl apply -f ./.continuous-delivery/k8s/service.yaml

# Print application URL
echo http://`kubectl get service/average-salary --output=json | jq -r '.status.loadBalancer.ingress[0].ip'`
