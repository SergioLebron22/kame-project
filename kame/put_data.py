# import psycopg2
# import json

# with open("icd10cm_codes_2020.json", "r") as json_file:
#     data = json.load(json_file)

# conn = psycopg2.connect(
#     database="kame",
#     user='postgres',
#     password='', #Add your own password here
#     host='127.0.0.1',
#     port='5432'
# )

# cursor = conn.cursor()

# for code, description in data.items():
#     cursor.execute(
#         "INSERT INTO icd10 (code, description) VALUES (%s, %s)",
#         (code, description)
#     )

# conn.commit()

# conn.close()

import sqlite3
import json

with open("icd10cm_codes_2020.json", "r") as json_file:
    data = json.load(json_file)

# Connect to the SQLite database
conn = sqlite3.connect('/home/christian/kame-project/kame/kame/db.sqlite3')

cursor = conn.cursor()

# Insert data into the icd10 table
for code, description in data.items():
    cursor.execute(
        "INSERT INTO icd10 (code, description) VALUES (?, ?)",
        (code, description)
    )

# cursor.execute("ALTER TABLE kame_app_user RENAME TO kame_app_customuser")

# Commit the transaction
conn.commit()

# Close the connection
conn.close()
