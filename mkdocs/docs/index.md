# grafit-io

[![Build Status](https://travis-ci.org/grafit-io/grafit.svg?branch=master)](https://travis-ci.org/grafit-io/grafit)


# Prerequisites

- Docker [Mac](https://docs.docker.com/docker-for-mac/install/) / [Windows](https://docs.docker.com/docker-for-windows/install/)

# Initialize the project

Start the dev server for local development:

```bash
docker-compose up
```

Create a superuser to login to the admin:

```bash
docker-compose run --rm backend ./manage.py createsuperuser
```

For database migrations run:
```bash
docker-compose run --rm backend ./manage.py makemigrations
```


# Continuous Deployment

Deployment automated via Travis. ... TODO

