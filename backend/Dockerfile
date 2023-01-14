FROM mysql:latest

WORKDIR /src/app

COPY ./db/ /docker-entrypoint-initdb.d/

EXPOSE 3001

# ENTRYPOINT ["docker-entrypoint.sh"]

# CMD ["python", "app.py"]