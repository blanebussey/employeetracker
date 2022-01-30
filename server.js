const db = require("./db/connection")
const inquirer = require("inquirer")
const table = require("console.table")

const tasks = {
    "View all departments": viewDepts,
    "View all roles": viewRoles,
    "View all employees": viewEmployees,
    "Add a department": addDept,
    "Add a role": addRole,
    "Add an employee": addEmployee,
    "Update an employee role": updateEmployee
}

async function viewDepts() {
    const results = await db.query(
        "SELECT * FROM department"
    )
    console.table(results[0])
}

async function viewRoles() {
    const results = await db.query(
        "SELECT * FROM role"
    )
    console.table(results[0])
}

async function viewEmployees() {
    const results = await db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last " +
        "FROM employee " +
        "INNER JOIN role " +
        "ON employee.role_id=role.id " +
        "INNER JOIN department " +
        "ON role.department_id=department.id " +
        "LEFT JOIN employee AS manager " +
        "ON employee.manager_id=manager.id "
    )
    console.table(results[0])

}

async function addDept() {
    const { department_name } = await inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "Name of department you would like to add"
        }
    ])
    const results = await db.query(`INSERT INTO department(department_name) VALUES ("${department_name}")`)
}

async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Name of title of role you would like to add"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id?"
        }
    ])
    const results = await db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`)

}

async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role the employee you would like to add?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager id of the employee you would like to add?"
        }
    ])
    const results = await db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])

}
async function updateEmployee() {
    const { employee, role } = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id", 
            message: "What is the empoyee id of the employee that you would like to update?"
        },
      {
          type: "input",
          name: "role",
          message: "What is the new role you would like to give them?"
      }  
    ])
    const results = await db.query('UPDATE employee SET role_id=? WHERE id= ?', [role, employee_id])
}

function askTask() {
    inquirer.prompt([
        {
            type: 'list',
            name: "task",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ])
        .then(async (answers) => {
            const task = answers.task
            await tasks[task]()
            askTask()
        })
}

askTask()