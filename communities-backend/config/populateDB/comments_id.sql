\copy (SELECT id, parent_id,post_id FROM comments) TO /home/harshit/IITH/Sem6/SWE/assignments/SWE-project/Data/scripts/intermediateData/comments_id.csv DELIMITER ',' CSV HEADER;
