#!/bin/bash
set -eou pipefail
# This assumes that this already has requirements installed
source scripts/venv/bin/activate
python scripts/openapi/update_api.py

pushd scripts/openapi
yarn codegen
popd