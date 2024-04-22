import os
file_path = "."

# get abs path of current directory

abs_path = os.path.abspath(file_path)
print(abs_path)

filename = "./script.sql"

with open(filename,"w") as f:
    f.write(f"\\i {abs_path}/users.sql\n")
    f.write(f"\\i {abs_path}/communities.sql\n")
    f.write(f"\\i {abs_path}/authentication.sql\n")
    f.write(f"\\i {abs_path}/community_users.sql\n")
    f.write(f"\\i {abs_path}/posts.sql\n")
    f.write(f"\\i {abs_path}/comments.sql\n")
    f.write(f"\\i {abs_path}/votes.sql\n")
    f.write(f"\\i {abs_path}/followers.sql\n")
    f.write(f"\\i {abs_path}/moderators.sql\n")
    f.write(f"\\i {abs_path}/blocked.sql\n")
