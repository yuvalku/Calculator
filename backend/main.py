from fastapi import FastAPI
import pandas as pd
import sqlite3

app = FastAPI()
commands = []

@app.get("/")
def root():
    return {"message": "Welcome to the API"}