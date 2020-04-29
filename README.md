Comandos para execução do projeto:

docker run \
    --name postgres \
    -e POSTGRES_USER=dev \
    -e POSTGRES_PASSWORD=minhasenhadev \
    -e POSTGRES_DB=teams \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=minhasenhaadmin \
    -d \
    mongo:4

docker exec -it mongodb \
    mongo --host localhost -u admin -p minhasenhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('teams').createUser({user: 'dev', pwd: 'minhasenhadev', roles:[{role: 'readwrite', db: 'teams'}]})"
