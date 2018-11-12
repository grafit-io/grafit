import logging
import os
from time import time, sleep

from neomodel import db

DATABASE_URL = 'bolt://neo4j:test@neo4j:7687'

check_timeout = os.getenv("NEO4J_CHECK_TIMEOUT", 60)
check_interval = os.getenv("NEO4J_CHECK_INTERVAL", 1)
interval_unit = "second" if check_interval == 1 else "seconds"

start_time = time()
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


def n4j_isready():
    while time() - start_time < check_timeout:
        try:
            db.set_connection(DATABASE_URL)
            logger.info("Neo4J is ready!")
            return True
        except:
            logger.info(f"Neo4j isn't ready. Waiting for {check_interval} {interval_unit}...")
            sleep(check_interval)

    logger.error(f"We could not connect to Neo4j within {check_timeout} seconds.")
    return False


n4j_isready()
