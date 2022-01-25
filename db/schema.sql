DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;

USE store_db;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)

);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER, 
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
)