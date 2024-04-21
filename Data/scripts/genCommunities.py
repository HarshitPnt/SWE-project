subreddit_path = "../data/subs/sub.txt"

with open(subreddit_path, 'r') as f:
    subreddits = f.read().splitlines()

output_path = "../../communities-backend/config/populateDB/communities.sql"

import random

# random community descriptions in markdown(10)

descriptions = [
'''## Welcome to the community!\\n\\nThis is a place for all things related to the topic. Feel free to ask questions, share your ideas, and have discussions with other members. We are here to help each other out and make this community a great place to be.\\n\\nPlease remember to be respectful and follow the rules of the community.  Let us make this a positive and welcoming space for everyone!\\n\\n## Rules:\\n1. Be respectful to others\\n2. No spam or self-promotion\\n3. Keep discussions on topic\\n4. No hate speech or harassment\\n5. Have fun and enjoy your time here!\\n''',
'''## About the community\\n\\nThis community is dedicated to all things related to the topic. Whether you are a beginner or an expert, you will find something of interesthere. We are here to help each other out and make this a positive and welcoming space for everyone.\\nFeel free to ask questions, share your ideas, and have discussions with other members.  Let us make this community a great place to be!\\n\\n## Rules:\\n\\n- Be respectful to others\\n- No spam or self-promotion\\n- Keep discussions on topic\\n- No hate speech or harassment\\n- Have fun and enjoy your time here!\\n'''
]

visibilities = ['public', 'private']

banner_images =["https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]

import numpy as np
visibilities = ["public","request","invite"]

post_privileges = ["TRUE","FALSE"]

comment_privileges = ["TRUE","FALSE"]

for sub in subreddits:
    sub = sub[2:].strip()
    description = random.choice(descriptions)
    # gaussian distribution with mean 0 and std 2
    visibility_gaussian = int(np.random.normal(0, 2))%3
    visibility = visibilities[visibility_gaussian]
    banner_image = random.choice(banner_images)
    # gaussian distribution with mean 0 and std 2
    post_privilege = int(np.random.normal(0, 2))%2
    post_privilege = post_privileges[post_privilege]
    # gaussian distribution with mean 0 and std 0.5
    comment_privilege = int(np.random.normal(0, 0.5))%2
    comment_privilege = comment_privileges[comment_privilege]
    creator_id = np.random.randint(1,3060)
    with open(output_path, 'a') as f:
        command = f"INSERT INTO communities(name,description,creator_id,visibility,post_privilege,comment_privilege) VALUES('{sub}','{description}',{creator_id},'{visibility}',{post_privilege},{comment_privilege});\n"
        f.write(command)

print("Done!")