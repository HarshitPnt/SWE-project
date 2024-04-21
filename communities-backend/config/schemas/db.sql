-- Users Table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_superuser BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    profile_picture VARCHAR(255),
    -- chat setting in ['direct','everyone','followed','mutual','none']
    chat_setting VARCHAR(255) DEFAULT 'everyone',
    -- profile privacy setting in ['public','private']
    profile_privacy_setting VARCHAR(255) DEFAULT 'public',
    -- notification setting in ['comment/reply','message','mention','follow']
    notification_setting VARCHAR(4) DEFAULT '1111',
    bio TEXT DEFAULT '',
    location VARCHAR(255) DEFAULT '',

    -- ALTER TABLE users ADD CONSTRAINT unique_username_email UNIQUE (username, email);
    CONSTRAINT unique_username_email UNIQUE (username, email)
);

-- Authentication Table

CREATE TABLE authentication (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    -- check that (user_name, email, created_at) is present in users table
    CONSTRAINT user_check FOREIGN KEY (username, email) REFERENCES users(username, email)
);

-- Communities Table

CREATE TABLE communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    creator_id INTEGER REFERENCES users(id),
    is_banned BOOLEAN DEFAULT FALSE,
    banned_reason TEXT DEFAULT '',
    status VARCHAR(255) DEFAULT 'active',
    visibility VARCHAR(255) DEFAULT 'public',
    banner_image VARCHAR(255),
    post_privilege BOOLEAN DEFAULT TRUE,
    comment_privilege BOOLEAN DEFAULT TRUE,
    -- posts: image, video, text, link, polls
    allowed_posts VARCHAR(5) DEFAULT '11111',

    CONSTRAINT visibility_check CHECK (visibility IN ('public', 'invite', 'request')),
    CONSTRAINT status_check CHECK (status IN ('active', 'banned', 'deleted'))
);

-- Community Members Table

CREATE TABLE community_users (
    user_id INTEGER REFERENCES users(id),
    community_id INTEGER REFERENCES communities(id),
    status VARCHAR(255) DEFAULT 'active',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    banned_at TIMESTAMP,
    banned_reason TEXT DEFAULT '',
    banned_by INTEGER REFERENCES users(id),
    -- privileges: post, comment
    privileges VARCHAR(2) DEFAULT '11',

    PRIMARY KEY (user_id, community_id),

    CONSTRAINT status_check CHECK (status IN ('active', 'banned','left','rejected-invite','rejected-request'))
);

-- Posts Table

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    creator_id INTEGER REFERENCES users(id),
    community_id INTEGER REFERENCES communities(id),
    is_banned BOOLEAN DEFAULT FALSE,
    banned_reason TEXT DEFAULT '',
    banned_by INTEGER REFERENCES users(id),
    -- post types: image, video, text, polls
    post_type VARCHAR(255) DEFAULT 'text',
    image TEXT DEFAULT '',
    video TEXT DEFAULT '',
    poll_question TEXT DEFAULT '',
    poll_end_at TIMESTAMP,
    poll_result TEXT DEFAULT '',

    CONSTRAINT post_type_check CHECK (post_type IN ('image', 'video', 'text', 'polls'))
);

-- Comments Table

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    creator_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    parent_id VARCHAR(255) DEFAULT '',
    is_banned BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    banned_reason TEXT DEFAULT '',
    banned_by INTEGER REFERENCES users(id),

    -- constraint that if parent_id not null then it should begin with c_
    CONSTRAINT parent_id_check CHECK (parent_id = '' OR parent_id ~ '^c_')

);

-- Votes Table

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id INTEGER REFERENCES users(id),
    parent_id VARCHAR(255) NOT NULL,
    -- vote types: -1 (downvote), 0 (upvote) (other types for polls)
    vote_type INTEGER NOT NULL,

    -- constraint that parent_id begins with p_ for posts and c_ for comments and v_ for votes
    CONSTRAINT parent_id_check CHECK (parent_id ~ '^(p|c|v)_')
);

-- Moderators Table

CREATE TABLE moderators (
    user_id INTEGER REFERENCES users(id),
    community_id INTEGER REFERENCES communities(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    privileges VARCHAR(8) DEFAULT '11111111',

    -- check that user_id,community_id is unique and is in community_users
    PRIMARY KEY (user_id, community_id)
);

-- Follows Table

CREATE TABLE follows (
    follower_id INTEGER REFERENCES users(id),
    followed_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    -- check that follower_id, followee_id is unique
    PRIMARY KEY (follower_id, followed_id),
    -- follower_id != followee_id
    CONSTRAINT follower_followee_check CHECK (follower_id != followed_id)
);

-- Reports Table

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reporter_id INTEGER REFERENCES users(id),
    reported_id INTEGER REFERENCES users(id),
    -- content_id: p_postid, c_commentid, u_userid
    content_id VARCHAR(255) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(255) DEFAULT 'pending',
    resolved_at TIMESTAMP,
    resolved_by INTEGER REFERENCES users(id),
    resolved_reason TEXT,
    community_id INTEGER REFERENCES communities(id),

    CONSTRAINT status_check CHECK (status IN ('pending', 'resolved', 'dismissed')),
    CONSTRAINT content_id_check CHECK (content_id ~ '^(p|c|u)_'),
    -- resolved_at should be greater than created_at
    CONSTRAINT resolved_check CHECK (resolved_at > created_at),
    -- resolved_by should be null if status is pending
    CONSTRAINT resolved_by_check CHECK (status = 'pending' AND resolved_by IS NULL)
    -- if status is not 'pending' then (if community_id is null then resolved_by should be a superuser else resolved_by should be a moderator of the community)
);

-- Notifications Table

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    link VARCHAR(255),

    CONSTRAINT type_check CHECK (type IN ('follow', 'comment', 'vote', 'mention', 'report', 'moderator', 'community')),
    -- read_at should be greater than created_at
    CONSTRAINT read_check CHECK (read_at >= created_at)
);

CREATE TABLE saved_posts (
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, post_id)
);

CREATE TABLE blocked (
    blocker_id INTEGER REFERENCES users(id),
    blocked_id INTEGER REFERENCES users(id),
    blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (blocker_id, blocked_id)
);

-- INDEXES
CREATE INDEX idx_community_users_userid ON community_users(user_id);
CREATE INDEX idx_community_users_communityid ON community_users(community_id);
CREATE INDEX idx_posts_community ON posts(community_id);
CREATE INDEX idx_posts_creator ON posts(creator_id);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_creator ON comments(creator_id);
CREATE INDEX idx_votes_parentid ON votes(parent_id);
CREATE INDEX idx_moderators_userid ON moderators(user_id);
CREATE INDEX idx_moderators_communityid ON moderators(community_id);
CREATE INDEX idx_follows_followerid ON follows(follower_id);
CREATE INDEX idx_follows_followedid ON follows(followed_id);
CREATE INDEX idx_reports_reported ON reports(reported_id);
CREATE INDEX idx_reports_community ON reports(community_id);
