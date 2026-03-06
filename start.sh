#!/bin/sh
set -e

python backend/manage.py migrate --noinput
exec gunicorn config.wsgi:application --chdir backend --bind 0.0.0.0:${PORT:-10000}
