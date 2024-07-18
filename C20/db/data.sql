CREATE TABLE data(
    id integer PRIMARY KEY AUTOINCREMENT,
    name varchar(100) NOT NULL,
    height integer,
    weight float,
    birthdate date,
    married boolean DEFAULT false
);

INSERT INTO data (name, height, weight, birthdate, married) VALUES
('Nawawi', 177, 80, '1990-07-21', false),
('Nauval', 168, 65.2, '1998-07-31', true),
('Marsaa', 140, 40, '2000-08-27', false),
('Asri', 160, 50, '1995-01-10', true),
('Ilham', 170, 60, '2000-09-30', false),
('Ramdani', 170, 70, '1995-01-20', false);