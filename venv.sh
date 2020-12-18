#!/usr/bin/env bash

DIRECTORY=virtualenvs/.env
deactivate 2> /dev/null
if [ -d "${DIRECTORY}" ]; then
    source ${DIRECTORY}/bin/activate
else
    python3 -m venv ${DIRECTORY}
    source ${DIRECTORY}/bin/activate
fi

export CDN_HOST=http://localhost:8000/assets
export NODE_OPTIONS="--max-old-space-size=8192"
export DJANGO_SETTINGS_MODULE="milkyway.settings.prod"

server () {
    python manage.py runserver
}

client () {
    npm run watch
}