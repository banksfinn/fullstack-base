#!/bin/bash
set -o pipefail
# This assumes that this already has requirements installed
source venv/bin/activate
python update_api.py
yarn codegen
