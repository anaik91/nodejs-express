#!/bin/bash

source ./bootstrap/init.sh

trap_ctrlc () {
    get_running_container
    echo "Killing Container : $container_id"
    docker kill "$container_id"
    docker rm "$container_id"
}

trap "trap_ctrlc" 2

node index.js