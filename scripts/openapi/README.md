This is how we update the types defined in generatedGatewayClient

# Initial setup
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

# Henceforce
```
./update_api.sh
```

# Why is this here

We need this outside of the path of the package.json in frontend, or else weird stuff happens. This was the best solution I could find