#!/bin/bash

sleep 30

sudo yum update -y

sudo yum install -y gcc-c++ make

curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

# Install MySQL
sudo amazon-linux-extras install epel -y
sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
sudo yum install mysql-community-server -y
sudo systemctl start mysqld.service
# password=$(sudo cat /var/log/mysqld.log | grep "A temporary password" | awk '{print $NF}')

export temp=$(sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}')
sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';CREATE DATABASE cloud_app;USE cloud_app;"

cd /home/ec2-user && unzip ./webapp.zip

cd ~/webapp

npm install

npm uninstall bcrypt

npm install bcrypt

echo "done init"

sudo mv /home/ec2-user/webapp.service /etc/systemd/system/webapp.service
sudo systemctl enable webapp.service
sudo systemctl start webapp.service
