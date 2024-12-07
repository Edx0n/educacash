@echo off


echo Ola Professor, tudo bem? O Projeto ira iniciar sozinho, por favor aguarde pacientemente ate todos os pacotes carregarem.
start cmd.exe /k "cd client && npm i && npm start"
cd api && npm i && npm start 


pause