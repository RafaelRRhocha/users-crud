FROM mysql:latest

WORKDIR /src/

COPY ./db/ /docker-entrypoint-initdb.d/

EXPOSE 3306:3306