\copy (SELECT community_id, user_id FROM community_users) TO /home/harshit/IITH/Sem6/SWE/assignments/SWE-project/Data/scripts/intermediateData/community_user.csv DELIMITER ',' CSV HEADER;
