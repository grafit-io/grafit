# Quickstart

To get started developing you need to install the following:

- Docker [Mac](https://docs.docker.com/docker-for-mac/install/) / [Windows](https://docs.docker.com/docker-for-windows/install/) (with docker-compose)

## Initialize the project

Use the following commands to initialize the local development environment:

```bash
# Apply DB migrations
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py migrate

# Create a superuser
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py createsuperuser

# Start containers
docker-compose -f docker-compose.dev.yml up
```

To generate migration scripts for new database changes run:

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py makemigrations
```

To run tests:

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py test
```
