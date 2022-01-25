INSERT INTO department(department_name)
VALUES ("Home&Garden"),
("Grocery"),
("Electronics");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales rep", 50000, 1),
("Sales rep", 40000, 2),
("Sales rep", 60000, 3),
("Manager", 70000, 1),
("Manager", 60000, 2),
("Manager", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Monica", "Gellar", 6, null),
("Joey", "Tribiani", 3, 1),
("Rachel", "Green", 5, 2),
("Chander", "Bing", 2, 3),
("Phoebe", "Bouffet", 4, 3),
("Elaine", "Benece", 1, 5); 