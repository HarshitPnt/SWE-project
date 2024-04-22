# from .env file import SHA_SALT

env = open("../../communities-backend/.env", "r")

salt = ""
with open("../../communities-backend/.env", "r") as f:
    lines = f.readlines()
    # SHA_SALT="SOME SALT"
    for line in lines:
        if "SHA_SALT" in line:
            salt = line.split("=")[1].strip()[1:-1]
            break


# Hash passwords for user_names

import hashlib

user_file = "../data/users/users.txt"

with open(user_file, "r") as f:
    lines = f.readlines()
    print(lines)

for line in lines:
    line = line.strip()
    if line=="[deleted]":
        continue
    hashed = hashlib.sha256((line + salt).encode()).hexdigest()
    command = f"INSERT INTO authentication(username,email, password) VALUES ('{line}','{line}@dummy.com','{hashed}');"
    with open("../../communities-backend/config/populateDB/authentication.sql", "a") as f:
        f.write(command + "\n")