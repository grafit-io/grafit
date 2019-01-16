# Quickstart

## Prerequisites

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

## Neo4J

The Neo4J database is used to store the knowledge graph.

### Webinterface

When starting the docker containers using the docker-compose.dev.yml the Neo4J webinterface is exposed on port 7474.

### Management Commands

The following management commands can be used:

#### install_labels

This command sets up the constraints and indexes based on the neomodel definitions.

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py install_labels
```

#### clear_neo4j

This command deletes all nodes in the Neo4J database

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py clear_neo4j
```

## Continuous Deployment

Deployment automated via Travis. ... TODO
