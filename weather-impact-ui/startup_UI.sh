#!/bin/bash



chmod +x /var/www/html

service apache2 start

while true
do
  sleep 5
  echo "running"
done

