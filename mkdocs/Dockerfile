FROM python:3.6-alpine

LABEL Name=grafit_docs Version=0.0.1
EXPOSE 8001

COPY ./requirements.txt requirements.txt
# Using pip
RUN pip install -r requirements.txt

COPY . /code
WORKDIR /code

CMD mkdocs serve
