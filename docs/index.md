# django-rest-test

[![Build Status](https://travis-ci.org/grafit-io/grafit.svg?branch=master)](https://travis-ci.org/grafit-io/grafit)
[![Built with](https://img.shields.io/badge/Built_with-Cookiecutter_Django_Rest-F7B633.svg)](https://github.com/agconti/cookiecutter-django-rest)

# Prerequisites

- Docker [Mac](https://docs.docker.com/docker-for-mac/install/) [Windows][https://docs.docker.com/docker-for-windows/install/)

# Initialize the project

Start the dev server for local development:

```bash
docker-compose up
```

Create a superuser to login to the admin:

```bash
docker-compose run --rm web ./manage.py createsuperuser
```


# Continuous Deployment

Deployment automated via Travis. ... TODO

