# Neo4J

The Neo4J database is used to store the knowledge graph.

## Webinterface

When starting the docker containers using the docker-compose.dev.yml the Neo4J webinterface is exposed on port 7474.

## Management Commands

The following management commands can be used:

### install_labels

This command sets up the constraints and indexes based on the neomodel definitions.

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py install_labels
```

### clear_neo4j

This command deletes all nodes in the Neo4J database

```bash
docker-compose -f docker-compose.dev.yml run --rm backend ./manage.py clear_neo4j
```
