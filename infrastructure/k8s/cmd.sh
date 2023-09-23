cmd="$1"

case $cmd in
"run")
  skaffold run
  ;;
"dev")
  skaffold run
  ;;
"deploy-dev")
  helm upgrade aloco template --values template/values-development.yaml
  ;;
"deploy-prod")
  helm upgrade aloco template --values template/values-production.yaml
  ;;
"upgrade-dev")
  helm upgrade aloco template --values template/values-production.yaml
  ;;
"upgrade-prod")
  helm upgrade aloco template --values template/values-production.yaml
  ;;
*)
  echo "$cmd" "don't exits"
esac

