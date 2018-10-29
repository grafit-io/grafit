FROM python:3.6

LABEL Name=grafit Version=0.0.1
EXPOSE 8000

# Using pipenv:
COPY ./Pipfile Pipfile
COPY ./Pipfile.lock Pipfile.lock
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile
RUN python -m textblob.download_corpora

COPY ./backend /code
WORKDIR /code

# Migrates the database, uploads staticfiles
# TODO run with gunicorn
CMD ./manage.py migrate && \
    ./manage.py collectstatic --noinput && \
    ./manage.py runserver 0.0.0.0:8000

#PROD => gunicorn --bind 0.0.0.0:8000 --access-logfile - backend.wsgi:application
