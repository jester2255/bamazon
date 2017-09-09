/*
Then create a Node application called bamazonCustomer.js. 
Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.

The app should then prompt users with two messages.
	The first should ask them the ID of the product they would like to buy.
	The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, 
your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
*/
const delay = require('delay');
var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host: 'localhost',
	port:  3306,
	user: 'root',
	password: '5522retsej',
	database: 'bamazondb', 
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

connection.connect(function (err) {
	if (err) {
		throw err;
	}
	//making sure I have a conection
	//console.log("connected as id " + connection.threadId);
	showAll()
	
});

function showAll(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) {throw err;
		}//console.log(res);
		for (var i = 0; i < res.length; i++) {

			console.log("\t ID#: "+res[i].item_id+" Product: "+res[i].prod_name+" Price: "+res[i].price)
			console.log("\t____________________________________________________")
		}
	})
delay(200)
    .then(() => {
        // Executed after 200 milliseconds
        customerRequest() 
    });

	
}

function customerRequest(){
	inquirer
    .prompt([
    {
		name: "item",
    	type: "input",
    	message: "what is the number if the item you would like to buy?",
		validate: validateInput,
		filter: Number
    },
    {
		type: 'input',
		name: 'quantity',
		message: 'How many woud you like?',
		validate: validateInput,
		filter: Number
	}
    ])
    .then(function(input) {
		//console.log('Customer has selected: \n    item_id = '  + input.item + '\n    quantity = ' + input.quantity);

		var item = input.item;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');

			} else {
				var productData = data[0];
			}

			if (quantity <= productData.stk_qty) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stk_qty = ' + (productData.stk_qty - quantity) + ' WHERE item_id = ' + item;
					 console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");
					customerRequest()
				}
			})
		})
	}
