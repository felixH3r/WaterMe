create database waterme;

create table sensordata (
  id integer,
  ts timestamp,
  waterlevel numeric not null,
  primary key(id, ts)
);

create table plants (
  name text primary key,
  demand text not null,
  picture bytea
);

create table zuordnung (
  users text,
  pflanze text,
  sensor integer,
  gegossen_am timestamp,
  primary key(users, pflanze, sensor)
);
