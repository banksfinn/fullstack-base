#!/bin/bash
set -o pipefail

echo "Generating script virtual environment (python)"
python3.10 -m venv scripts/venv
source scripts/venv/bin/activate
pip install -r scripts/requirements.txt

# echo "Generating gateway virtual environment (python)"
# python3 -m venv gateway/venv
# source gateway/venv/bin/activate
# pip install -r gateway/requirements.txt
