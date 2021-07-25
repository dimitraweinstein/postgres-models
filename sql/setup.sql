DROP TABLE IF EXISTS beanies;
DROP TABLE IF EXISTS beverages;
DROP TABLE IF EXISTS roots_albums;
DROP TABLE IF EXISTS owls;



CREATE TABLE beanies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    theme TEXT NOT NULL,
    animal TEXT NOT NULL,
    release_year INTEGER NOT NULL
);

CREATE TABLE beverages (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE roots_albums (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    album TEXT NOT NULL,
    recording_label TEXT NOT NULL,
    release_year INTEGER NOT NULL
);

CREATE TABLE owls (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owl TEXT NOT NULL,
    habitat TEXT NOT NULL,
    threats TEXT NOT NULL
);