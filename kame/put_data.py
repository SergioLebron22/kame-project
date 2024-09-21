import psycopg2
import json

with open("icd10cm_codes_2020.json", "r") as json_file:
    data = json.load(json_file)

conn = psycopg2.connect(
    database="kame",
    user='postgres',
    password='Bimbo@2569',
    host='127.0.0.1',
    port='5432'
)

cursor = conn.cursor()

for code, description in data.items():
    cursor.execute(
        "INSERT INTO icd10 (code, description) VALUES (%s, %s)",
        (code, description)
    )

conn.commit()

conn.close()
