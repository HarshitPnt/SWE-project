CREATE TABLE conversations(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    status VARCHAR(255) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked'))
    -- id for this pair
);

CREATE TABLE group_conversations(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creator_id INTEGER REFERENCES users(id)
    -- id for this group
);

CREATE TABLE user_group(
    user_id INTEGER REFERENCES users(id),
    group_id INTEGER REFERENCES group_conversations(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    status VARCHAR(255) DEFAULT 'active' CHECK (status IN ('active', 'left', 'removed')),
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE messages(
    chat_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    -- constraint : chat id starts with G or D
    -- G for group chat
    -- D for direct chat
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chat_id_check CHECK (chat_id ~ '^(G|D)_')

    -- If start with G then check chat_id in group_conversations else in conversations
);

