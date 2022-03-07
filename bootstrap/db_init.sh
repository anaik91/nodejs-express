#!/bin/bash

db_host="${DB_HOST:-localhost}"
db_port="${DB_PORT:-3306}"
db_user="${DB_USER:-root}"
db_password="${DB_PASSWORD:-"my-secret-pw"}"
db_name="${DB_NAME:-test}"

mysql -u${db_user} -P${db_port} -p${db_password} -h${db_host} -e "CREATE DATABASE IF NOT EXISTS ${db_name}"
mysql -u${db_user} -P${db_port} -p${db_password} -h${db_host} -e "USE ${db_name};CREATE TABLE IF NOT EXISTS courses (Id int,Name varchar(255))"
mysql -u${db_user} -P${db_port} -p${db_password} -h${db_host} -e "USE ${db_name};DESCRIBE courses"