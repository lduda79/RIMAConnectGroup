#!/usr/bin/env bash
set -euo pipefail

echo "Migrating database ..."
python manage.py migrate

source "${BASH_SOURCE%/*}/download.sh"

echo "Starting Celery job queue ..."
celery worker --app=interest_miner_api -l info
