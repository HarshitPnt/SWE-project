sub_file = "../data/subs/sub.txt"

subreddits = []

with open(sub_file, 'r') as f:
    for line in f:
        subreddits.append(line.strip())


# for each subreddit open its posts and comments

import json
import pandas

df = pandas.read_csv("./intermediateData/username_userid.csv")
df_com = pandas.read_csv("./intermediateData/community_id.csv")

df.set_index('username', inplace=True)
df_com.set_index('name', inplace=True)
sub_dict = {}
post_sub = {}
comment_sub = {}

for sub in subreddits:
    sub = sub[2:].strip()
    print(sub)
    post_file = f"../data/cleaned_data/{sub}_posts.json"
    comment_file = f"../data/cleaned_data/{sub}_comments.json"
    sub_dict[sub] = []
    post_sub[sub] = []
    comment_sub[sub] = []
    # load json file
    with open(post_file, 'r') as f:
        posts = json.load(f)
        for post in posts:
            sub_dict[sub].append(post['author'])
            post_sub[sub].append(post['author'])
    with open(comment_file, 'r') as f:
        comments = json.load(f)
        for comment in comments:
            sub_dict[sub].append(comment['author'])
            comment_sub[sub].append(comment['author'])
    sub_dict[sub] = list(set(sub_dict[sub]))
    post_sub[sub] = list(set(post_sub[sub]))
    comment_sub[sub] = list(set(comment_sub[sub]))
    #remove "[deleted]"
    sub_dict[sub] = [x for x in sub_dict[sub] if x != "[deleted]"]
    post_sub[sub] = [x for x in post_sub[sub] if x != "[deleted]"]
    comment_sub[sub] = [x for x in comment_sub[sub] if x != "[deleted]"]

    if df_com.loc[sub]['post_privilege'] == 't':
        for user in sub_dict[sub]:
            command = f"INSERT INTO community_users(user_id,community_id,privileges) VALUES({df.loc[user]['id']},{df_com.loc[sub]['id']},'11');\n"
            with open("../../communities-backend/config/populateDB/community_user.sql", 'a') as f:
                f.write(command)
    elif df_com.loc[sub]['comment_privilege'] == 't':
        for user in sub_dict[sub]:
            post_priv = 0
            if user in post_sub[sub]:
                post_priv = 1
            command = f"INSERT INTO community_users(user_id,community_id,privileges) VALUES({df.loc[user]['id']},{df_com.loc[sub]['id']},'{post_priv}1');\n"
            with open("../../communities-backend/config/populateDB/community_user.sql", 'a') as f:
                f.write(command)
    else:
        for user in sub_dict[sub]:
            post_priv = 0
            comment_priv = 0
            if user in post_sub[sub]:
                post_priv = 1
            if user in comment_sub[sub]:
                comment_priv = 1
            command = f"INSERT INTO community_users(user_id,community_id,privileges) VALUES({df.loc[user]['id']},{df_com.loc[sub]['id']},'{post_priv}{comment_priv}');\n"
            with open("../../communities-backend/config/populateDB/community_user.sql", 'a') as f:
                f.write(command)
    print(f"Done with {sub}")

print("Done with all subs")

# randomly insert some users with default privileges

import random

for i in range(600):
    user = random.choice(df.index)
    community = random.choice(df_com.index)
    post_priv = 1
    comment_priv = 1
    if user in sub_dict[community]:
        continue
    if df_com.loc[community]['post_privilege'] == 'f':
        post_priv = 0
    if df_com.loc[community]['comment_privilege'] == 'f':
        comment_priv = 0
    command = f"INSERT INTO community_users(user_id,community_id,privileges) VALUES({df.loc[user]['id']},{df_com.loc[community]['id']},'{post_priv}{comment_priv}');\n"
    with open("../../communities-backend/config/populateDB/community_user.sql", 'a') as f:
        f.write(command)

    