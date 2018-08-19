var mysql = require('mysql');
var inquirer = require('inquirer');
var quantity = 0;
var totalOrder = [];

// inquirer.prompt([{
//     name: 'name',
//     type: 'input',
//     message: 'What\'s your name?',
// }, {
//     name: 'iceCream',
//     type: 'list',
//     message: 'Which is your favorite of the following ice cream flavors?',
//     choices: ['green tea', 'poppyseed jam', 'chile', 'vanilla'],
//     default: 3,
// }]).then((answers) => {
//     console.log(`\nHi ${answers.name}. I like ${answers.iceCream} ice cream too! 😋\n`);
// });

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected!');
    runSearch();
});
  
function runSearch() {
    inquirer
    .prompt([{
        name: "askID",
        type: "input",
        message: "Please enter productID you want to buy (1-10/ 'exit for exiting the program')?"
    }, {
        name: "askQuantity",
        type: "input",
        message: "Please enter quantity you want to buy (give us a number)?"
    }])
    .then((answer) => {
        getQuantity(answer);
    });
}

function getQuantity(answer) {
    if(answer.askID === 'exit'){
        console.log('Thank you for vising us!');
        console.log('your total bill is : ' + calculatePrice(totalOrder));
        connection.end();
        return;
    }
    var quanReq = parseInt(answer.askQuantity);
    var itemReq = parseInt(answer.askID);
    console.log(answer.askQuantity, answer.askID);
    var query = "SELECT stock_quantity, price FROM products WHERE ?";
    connection.query(query, { item_id: answer.askID }, function(err, res) {
        if(err) {
            connection.end();
            throw err;
        }
        quantity = parseInt(res[0].stock_quantity);
        price = parseFloat(res[0].price);
        if(quanReq > quantity){
            console.log('We don\'t have this much quantity available. may be try again?');
            runSearch();
        } else {
            var newQuantity = quantity - quanReq;
            console.log('placing your order......');
            updateRows(newQuantity, itemReq);
            totalOrder.push([quanReq,price]);
            console.log('order placed!\n');
            runSearch();
        }
    });
}

function updateRows(quantity, item) {
    var sql = `UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${item}`;
    connection.query(sql, function (err, result) {
        if(err) {
            connection.end();
            throw err;
        }
    });
}

function calculatePrice(totalOrder){
    var tp = 0.0;
    totalOrder.forEach(arr => {
        tp += (arr[0] * arr[1]);
    });
    return tp;
}