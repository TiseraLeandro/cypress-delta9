#!/usr/bin/env bash

#Sources
#https://github.com/allure-framework/allure2/releases/download/2.23.1/allure_2.23.1-1_all.deb
#https://github.com/allure-framework/allure2/releases/download/2.23.1/allure-2.23.1.tgz

#curl -o allure-2.23.1.tgz -OLs https://github.com/allure-framework/allure2/releases/download/2.23.1/allure-2.23.1.tgz
#sudo tar -zxvf allure-2.23.1.tgz -C /opt/
#sudo ln -s /opt/allure-2.23.1.tgz/bin/allure /usr/bin/allure
#allure --version

curl -o allure_2.23.1-1_all.deb -OLs https://github.com/allure-framework/allure2/releases/download/2.23.1/allure_2.23.1-1_all.deb
sudo dpkg -i allure_2.23.1-1_all.deb
allure --version