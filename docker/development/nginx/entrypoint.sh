#!/bin/bash

set -e

cd /tretter

# dockerホストのIPアドレス取得
export DOCKER_HOST=$(ip route | awk '/default/ { print $3 }')
echo "DOCKER_HOST is $DOCKER_HOST"

# $TRETTER_RAILS_HOST のチェック
if [ ! $TRETTER_RAILS_HOST ]; then
  echo "use DOCKER_HOST as TRETTER_RAILS_HOST"
  export TRETTER_RAILS_HOST=$(echo $DOCKER_HOST)
fi
echo "TRETTER_RAILS_HOST is $TRETTER_RAILS_HOST"

# $TRETTER_RAILS_PORT のチェック
if [ ! $TRETTER_RAILS_PORT ]; then
  echo 'use default TRETTER_RAILS_PORT 33000'
  export TRETTER_RAILS_PORT=33000
fi
echo "TRETTER_RAILS_PORT is $TRETTER_RAILS_PORT"

# $TRETTER_LARAVEL_HOST のチェック
if [ ! $TRETTER_LARAVEL_HOST ]; then
  echo "use DOCKER_HOST as TRETTER_LARAVEL_HOST"
  export TRETTER_LARAVEL_HOST=$(echo $DOCKER_HOST)
fi
echo "TRETTER_LARAVEL_HOST is $TRETTER_LARAVEL_HOST"

# $TRETTER_LARAVEL_PORT のチェック
if [ ! $TRETTER_LARAVEL_PORT ]; then
  echo 'use default TRETTER_LARAVEL_PORT 34000'
  export TRETTER_LARAVEL_PORT=34000
fi
echo "TRETTER_LARAVEL_PORT is $TRETTER_LARAVEL_PORT"



# $TRETTER_FRONTEND_HOST のチェック
if [ ! $TRETTER_FRONTEND_HOST ]; then
  echo "use DOCKER_HOST as TRETTER_FRONTEND_HOST"
  export TRETTER_FRONTEND_HOST=$(echo $DOCKER_HOST)
fi
echo "TRETTER_FRONTEND_HOST is $TRETTER_FRONTEND_HOST"

# $TRETTER_FRONTEND_PORT のチェック
if [ ! $TRETTER_FRONTEND_PORT ]; then
  echo 'use default TRETTER_FRONTEND_PORT 43000'
  export TRETTER_FRONTEND_PORT=43000
fi
echo "TRETTER_FRONTEND_PORT is $TRETTER_FRONTEND_PORT"

# nginx用設定ファイルの作成
if [ $FRONT_STATIC_DEPLOY_TEST = 'true' ]; then
  envsubst '$$TRETTER_RAILS_HOST $$TRETTER_RAILS_PORT $$TRETTER_FRONTEND_HOST $$TRETTER_FRONTEND_PORT' < front_static_deploy_test.conf > /etc/nginx/conf.d/default.conf
else
  envsubst '$$TRETTER_RAILS_HOST $$TRETTER_RAILS_PORT $$TRETTER_FRONTEND_HOST $$TRETTER_FRONTEND_PORT' < default.conf > /etc/nginx/conf.d/default.conf
fi

# tretter_rails health check
echo 'Waiting for tretter_rails ...'
rails_count=1
rails_result=0
while [ $rails_result -eq 0 ]; do
  if [ $rails_count -gt 150 ]; then
    echo 'XXXXXXXXXX tretter_rails is unhealthy.'
    exit 1
  fi

  echo "********** Health check for tretter_rails: $rails_count th try **********"

  rails_status=$(curl -if http://$TRETTER_RAILS_HOST:$TRETTER_RAILS_PORT | awk 'NR==1{ print $2}')
  if [ "$rails_status" = '204' ]; then
    rails_result=1
    break;
  fi

  sleep 1

  rails_count=$((++rails_count))
done

echo "tretter_rails $TRETTER_RAILS_HOST:$TRETTER_RAILS_PORT is healthy."

# echo 'Waiting for tretter_laravel ...'
# count=1
# result=0
# while [ $result -eq 0 ]; do
#   if [ $count -gt 150 ]; then
#     echo 'XXXXXXXXXX tretter_laravel is unhealthy.'
#     exit 1
#   fi

#   echo "********** Health check for tretter_laravel: $count th try **********"

#   status=$(curl -if http://$TRETTER_LARAVEL_HOST:$TRETTER_LARAVEL_PORT | awk 'NR==1{ print $2}')
#   if [ "$status" = '204' ]; then
#     result=1
#     break;
#   fi

#   sleep 1

#   count=$((++count))
# done

# echo "tretter_laravel $TRETTER_LARAVEL_HOST:$TRETTER_LARAVEL_PORT is healthy."

exec "$@"
