CREATE TABLE msg (
    msg_id BIGSERIAL NOT NULL PRIMARY KEY,
    msg VARCHAR(150),
    user_id BIGINT REFERENCES usr(user_id)
);

CREATE TABLE usr (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    uname VARCHAR(50) NOT NULL
);

INSERT INTO usr(uname) VALUES ("Kandili Dinesh");
INSERT INTO usr(uname) VALUES ("Kandili Magesh");

ALTER TABLE msg ADD user_id BIGINT REFERENCES usr(user_id);

INSERT INTO msg(msg, user_id) VALUES ('Hello Dinesh', 1);
INSERT INTO msg(msg, user_id) VALUES ('Hi Dinesh', 1);
INSERT INTO msg(msg, user_id) VALUES ('Hi Magesh', 2);
INSERT INTO msg(msg, user_id) VALUES ('Hello Magesh', 2);

ALTER TABLE usr DROP COLUMN msg_id;