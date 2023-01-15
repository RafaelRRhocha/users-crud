# FROM python:latest
FROM mysql:latest

WORKDIR /src/app

COPY ./db/ /docker-entrypoint-initdb.d/

# CMD ["python", "app.py"]