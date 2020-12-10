#!/usr/bin/env bash

DIRECTORY=virtualenvs/.env
deactivate 2> /dev/null
if [ -d "${DIRECTORY}" ]; then
    source ${DIRECTORY}/bin/activate
else
    virtualenv -p `which python3` ${DIRECTORY}
    source ${DIRECTORY}/bin/activate
fi

export CDN_HOST=http://192.168.52.28:8000/