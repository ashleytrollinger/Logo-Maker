const inquirer = require("inquirer")
const fs = require("fs")

// look at string-width as a possible substitute
const maxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
inquirer.registerPrompt('maxlength-input', maxLengthInputPrompt)

//Getting my shapes
const { Triangle, Square, Circle } = require("./lib/shapes.js")

//Inquirer prompts to get the data from the user
inquirer.prompt([
    {
        type: "maxlength-input",
        message: "What 3 letter text do you want for your logo?",
        name: "text",
        maxLength: 3
    },
    {
        type: "input",
        message: "What color do you want your text (Keyword OR hexvalue)?",
        name: "textColor"
    },
    {
        type: "list",
        message: "What shape do you want for your logo?",
        name: "shape",
        choices: ["Circle", "Triangle", "Square"]
    },
    {
        type: "input",
        message: "What color do you want the shape?",
        name: "shapeColor"
    }

]).then((data) =>
    createLogo("logo.svg", data)

)



function createLogo(fileName, data) {
    let logo = "";
    logo = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">'
    logo += `${data.shape}`;

    //Setting up the shape of the logo based of answer, the data.shapeColor will set the color based off the value given by user
    let selectedShape;
    if (data.shape === 'Triangle') {
        selectedShape = new Triangle()
        logo += `<polygon points="150, 18 244, 182 56, 182" fill="${data.shapeColor}"/>`
    } else if (data.shape === 'Square') {
        selectedShape = new Square()
        logo += `<rect x="73" y="40" width="160" height="160" fill="${data.shapeColor}"/>`
    } else {
        selectedShape = new Circle()
        logo += `<circle cx="150" cy="115" r="80" fill="${data.shapeColor}"/>`
    }

    //Adding the text to the logo
    logo += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${data.textColor}">${data.text}</text>`
    logo += "<g>"
    logo += "</svg>"

    fs.writeFile('logo.svg', logo, function (err) {
        if (err) throw err;
        console.log('Logo Created!');
    });

}