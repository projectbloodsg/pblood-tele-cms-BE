-- create tables

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS message (
	message_id UUID DEFAULT uuid_generate_v4(),
	content TEXT,
	image_url VARCHAR(50),
	parent_id UUID,
	PRIMARY KEY (message_id),
	FOREIGN KEY (parent_id) REFERENCES message(message_id)
)