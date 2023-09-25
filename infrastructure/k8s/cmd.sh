cmd="$1"

prod_value="template/values-production.yaml"
dev_value="template/values-development.yaml"

case $cmd in
"run-local")
  skaffold run
  ;;
"watch-local")
  skaffold dev
  ;;
"clean-local")
  skaffold delete
  ;;
"deploy-dev")
  helm install aloco template --values "$dev_value"
  ;;
"deploy-prod")
  helm install aloco template --values "$prod_value"
  ;;
"upgrade-dev")
  helm upgrade aloco template --values "$dev_value"
  ;;
"upgrade-prod")
  helm upgrade aloco template --values "$prod_value"
  ;;
"lint")
  helm lint template --values "$prod_value" && helm lint template --values "$dev_value"
  ;;
*)
  echo "$cmd" "don't exits"
esac

# kubectl delete daemonsets,replicasets,services,deployments,pods,rc,ingress --all --all-namespaces