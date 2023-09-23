cmd="$1"

case $cmd in
"run")
  skaffold run
  ;;
"dev")
  skaffold run
  ;;
"deploy-dev")
  helm install aloco template --values template/values-development.yaml
  ;;
"deploy-prod")
  helm install aloco template --values template/values-production.yaml
  ;;
"upgrade-dev")
  helm upgrade aloco template --values template/values-development.yaml
  ;;
"upgrade-prod")
  helm upgrade aloco template --values template/values-production.yaml
  ;;
*)
  echo "$cmd" "don't exits"
esac

# kubectl delete daemonsets,replicasets,services,deployments,pods,rc,ingress --all --all-namespaces