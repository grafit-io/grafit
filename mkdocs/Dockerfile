FROM python:3.6-alpine

LABEL Name=grafit_docs Version=0.0.1
EXPOSE 8001

# Using pip
RUN pip install mkdocs

COPY . /code
WORKDIR /code

CMD mkdocs serve
