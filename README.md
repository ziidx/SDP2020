# SDP2020

This is a basic framework for the server side funcitonality

1) Make sure you have npm and nodejs installed

2) Install docker and docker compose in your systems if you don't have it already

$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt install docker-ce 

$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose

$ docker-compose --version

3)Clone the files into your local git directory

4)Put the docker-compose.yml file in the folder from discord

5)Open the terminal and run 'docker-compose up' to start the database 

6)Run the command 'npm run dev' in a separate terminal to start the backend