API disponível no endereço:

    https://teams-data.herokuapp.com/

Veja documentação em:

    https://teams-data.herokuapp.com/documentation


Comandos para execução do projeto:

```
docker run \
    --name postgres \
    -e POSTGRES_USER=dev \
    -e POSTGRES_PASSWORD=minhasenhadev \
    -e POSTGRES_DB=teams \
    -p 5432:5432 \
    -d \
    postgres
````
```
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=minhasenhaadmin \
    -d \
    mongo:4
````
```
docker exec -it mongodb \
    mongo --host localhost -u admin -p minhasenhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('teams').createUser({user: 'dev', pwd: 'minhasenhadev', roles:[{role: 'readWrite', db: 'teams'}]})"
```

```
docker exec -it CONTAINER_ID mongo -u dev -p minhasenhadev --authenticationDatabase teams 
```


Links úteis: 

https://www.mongodb.com/cloud

https://www.heroku.com/

https://pm2.io/