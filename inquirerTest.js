const inquirer = require('inquirer');

inquirer.prompt([{
  name: 'name',
  type: 'input',
  message: 'What\'s your name?',
}, {
  name: 'iceCream',
  type: 'list',
  message: 'Which is your favorite of the following ice cream flavors?',
  choices: ['green tea', 'poppyseed jam', 'chile', 'vanilla'],
  default: 3,
}]).then((answers) => {
  console.log(`\nHi ${answers.name}. I like ${answers.iceCream} ice cream too! 😋\n`);
});