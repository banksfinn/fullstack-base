#!/bin/sh
set -euo pipefail

# Inject environment variables into the template
envsubst '${PORT} ${GATEWAY_URL}' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf


nginx -g 'daemon off;'
