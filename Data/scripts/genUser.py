import random
import numpy as np
user_file = open("../data/users/users.txt", "r")

with open("../data/users/users.txt", "r") as f:
    lines = f.readlines()
    print(lines)

# some random locations (20)

locations = ["Hyderabad/India","California/USA","New York/USA","Texas/USA","Florida/USA","Washington/USA","London/UK","Paris/France","Berlin/Germany","Rome/Italy","Tokyo/Japan","Beijing/China","Sydney/Australia","Cape Town/South Africa","Rio de Janeiro/Brazil","Moscow/Russia","Dubai/UAE","Istanbul/Turkey","Mexico City/Mexico","Toronto/Canada"]

# some random bios (20)

bios = ["I am a software engineer","I am a student","I am a teacher","I am a doctor","I am a lawyer","I am a chef","I am a musician","I am a photographer","I am a writer","I am a painter","I am a dancer","I am a singer","I am a fitness trainer","I am a model","I am a business owner","I am a freelancer","I am a consultant","I am a researcher","I am a scientist","This is a test data"]

notifications = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"]

privacies = ["public","private"]

chats = ["everyone","followed","none","direct","mutual"]

for line in lines:
    line = line.strip()
    # generate a random number between 0 and 19
    random_location = random.randint(0,19)
    random_bio = random.randint(0,19)
    location = locations[random_location]
    random_notification = random.randint(0,15)
    notification = notifications[random_notification]
    bio = bios[random_bio]

    # gaussian distribution with mean 0 and std 0.2
    privacy = int(np.random.normal(0,0.2))
    if privacy < 0:
        privacy = -privacy
    privacy = privacies[privacy%2]

    # gaussian distribution with mean 0 and std 2
    chat = int(np.random.normal(0,2))
    if chat < 0:
        chat = -chat
    chat = chats[chat%4]

    if line=="[deleted]":
        continue

    command = f"INSERT INTO users(username, email, created_at, updated_at, is_superuser,is_banned,is_deleted,profile_picture,chat_setting,profile_privacy_setting,notification_setting,bio,location) VALUES ('{line}','{line}@dummy.com',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,'','{chat}','{privacy}','{notification}','{bio}','{location}');"
    with open("../../communities-backend/config/populateDB/users.sql", "a") as f:
        f.write(command + "\n")


