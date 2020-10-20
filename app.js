const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArr = [];

//user multiple inquirer prompts w promises to chain them (use .then to do this)

function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose a role",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the employees name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employe's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employe's email?"
        },

    ])
        .then(function (answers) {
            if (answers.role === "Manager") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "What is the employee's office number?"
                    }
                ])
                    .then(function (response) {
                        const manager = new Manager(answers.name, answers.id, answers.email, response.officeNumber);
                        employeeArr.push(manager);
                        addEmployee()
                    })
            } else if (answers.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is the employee's github?"
                    }
                ])
                    .then(function (response) {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, response.github);
                        employeeArr.push(engineer);
                        addEmployee()
                    })
            } else if (answers.role === "Intern") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What is the employee's school?"
                    }
                ])
                    .then(function (response) {
                        const intern = new Intern(answers.name, answers.id, answers.email, response.school);
                        employeeArr.push(intern);
                        addEmployee()

                    })
            }
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add another employee?"
        }
    ]).then(function (response) {
        if (response.addEmployee) {
            init()
        }
        else {
            const data = render(employeeArr);
            fs.writeFile(outputPath, data, function (err) {
                if (err) throw err;
                console.log("Success!")
            })
        }

    })
}

init()

