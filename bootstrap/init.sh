#!/bin/bash
BASEDIR=$(dirname "$0")
MYSQL_IMAGE="mysql"
MYSQL_VERSION="5.7.37"
MYSQL_CONTAINER_NAME="some-mysql"
db_host="${DB_HOST:-localhost}"
db_port="${DB_PORT:-3306}"
db_user="${DB_USER:-root}"
db_password="${DB_PASSWORD:-"my-secret-pw"}"
db_name="${DB_NAME:-test}"

get_running_container() {
    container_id=$(docker ps -q -f "name=${MYSQL_CONTAINER_NAME}")
}

get_running_container

if [ ! -z "$container_id" ]; then
        echo "Container with ID $container_id is already running ! please check"
        exit 1
fi

echo "No Running Container with Name $MYSQL_CONTAINER_NAME Found ! Creating Container"

docker run --name ${MYSQL_CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=${db_password} -d -p ${db_port}:3306 ${MYSQL_IMAGE}:${MYSQL_VERSION}
get_running_container
echo "Container Started with Id : $container_id"

echo "Waiting for DB to start ..."
sleep 10

echo "Creating DB & Tables !! "
docker cp ${BASEDIR}/bootstrap/db_init.sh ${MYSQL_CONTAINER_NAME}:/tmp/db_init.sh
docker exec ${MYSQL_CONTAINER_NAME} bash /tmp/db_init.sh
echo "Finished DB & Table Creation !! "