#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z postgres 5432; do
  sleep 1
done

echo "PostgreSQL started"

python manage.py migrate
python manage.py collectstatic --noinput

gunicorn config.wsgi:application --bind 0.0.0.0:8000