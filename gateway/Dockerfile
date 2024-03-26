FROM python:3.10-alpine

WORKDIR /gateway

COPY . .
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

CMD uvicorn main:app --host 0.0.0.0 --port 8080
