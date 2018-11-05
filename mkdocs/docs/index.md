# grafit-io

[![Build Status](https://travis-ci.com/grafit-io/grafit.svg?branch=master)](https://travis-ci.com/grafit-io/grafit) 
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgrafit-io%2Fgrafit?ref=badge_shield)

# Prerequisites

- Docker [Mac](https://docs.docker.com/docker-for-mac/install/) / [Windows](https://docs.docker.com/docker-for-windows/install/)

# Initialize the project

Initialize local development environment:

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


# Continuous Deployment

Deployment automated via Travis. ... TODO

