import requests

# Download the API
import json

url = "http://localhost:6523"

try:
    r = requests.get(url + "/openapi.json")
except:
    print("Unable to fetch the openapi file, is the local server running?")
    exit(1)

with open("../../gateway/api/generated/openapi.json", "w") as e:
    e.write(json.dumps(r.json()))
