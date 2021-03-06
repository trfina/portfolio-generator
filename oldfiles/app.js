const inquirer = require('inquirer');
const fs = require('fs');
// this expression assigns the anonymous HTML template function 
// in pagetemplate.js to the variable generatePage
const generatePage = require('./src/page-template');


const promptUser = () => {
    // the inquire prompt method is an array of objects known as the question object
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        } 
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub name!');
                return false;
            }
        } 
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about  yourself:',
        default: true
    },
    {   type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    }
]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
            }
        } 
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please the description of your project!');
                return false;
            }
        } 
    },
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap','Node']
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter the link to your GitHub account??!');
                return false;
            }
        } 
    },
    {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false 
    },
    {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
    }
    ])
    // the then function is the answer object, also know as a Promise
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else{
            return portfolioData;  
        }
    });   
};

// function called to get answers to profile questions
// then method to the function promptUser (promise)
// which then calls profolioData - a second promise.  
// within portfolioData is another function call -- the final promise for the inquirer prompt
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage (portfolioData);

        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Page created! Check out index.html');
            
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Style sheet copied successfully!');
                });
            
        });
        
    });
