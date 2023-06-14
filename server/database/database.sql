CREATE TABLE players
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255),
    username        VARCHAR(255),
    country         VARCHAR(255),
    age             INTEGER,
    game            VARCHAR(255),
    level           INTEGER,
    is_professional BOOLEAN,
    team            VARCHAR(255),
    earnings        INTEGER
);

CREATE TABLE player_social
(
    id        SERIAL PRIMARY KEY,
    player_id INTEGER,
    platform  VARCHAR(255),
    url       VARCHAR(255),
    FOREIGN KEY (player_id) REFERENCES players (id)
);

INSERT INTO players (name, username, country, age, game, level, is_professional, team, earnings)
VALUES ('Ilya', 'm0nesy', 'Russia', 18, 'CS:GO', 10, true, 'G2', 500000);

INSERT INTO player_social (player_id, platform, url)
VALUES (1, 'twitch', 'https://www.twitch.tv/m0nesyof'),
       (1, 'vk', 'https://vk.com/m0nesyof');

INSERT INTO players (name, username, country, age, game, level, is_professional)
VALUES ('Ivan', 'DrEiZ3R', 'Belarus', 19, 'CS:GO', 8, false);

INSERT INTO player_social (player_id, platform, url)
VALUES (2, 'vk', 'https://vk.com/dreizer228');