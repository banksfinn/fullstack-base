source venv/bin/activate
source environments/sandbox.sh
# If you change port here, make sure to update it in the frontend vite.config.js file!
uvicorn main:app --host "0.0.0.0" --port "6524" --reload
