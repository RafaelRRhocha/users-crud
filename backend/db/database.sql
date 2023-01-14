USE UsersDB;

CREATE TABLE users (
  id integer not null auto_increment PRIMARY KEY,
  name varchar(255) not null,
  email varchar(255) not null
);