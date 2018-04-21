const   mysql    = require("mysql"),
        inquirer = require("inquirer"),
        tableFormatter = require("./tableFormatter_Cust.js");
        
        

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "", 
    database: "bamazon"
});

var tableHeading = {
    1: "ID", 
    2: "Name", 
    3: "Description", 
    4: "Price"
};

connection.connect(function(error) {
    if(error) throw error;

    console.log("connected as id " + connection.threadId + "\n");
    readProducts();     
});

function readProducts() {

    connection.query(
        // "SELECT * FROM products", 
        "SELECT item_id, product_name, product_description, price FROM products",         
        function(error, result) {
            if(error) throw error;

            let table = new tableFormatter(result, tableHeading);            
            table.consoleLog();
            addToCart();
        }
    );
}

function addToCart() {
    inquirer.prompt(
        {
            type: "input",
            message: "ID of product you'd like to buy?",
            name: "productID",
            validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0) ? true : false
        }
    ).then( buyID => {
        return inquirer.prompt(
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "productQTY"
            }
        ).then( buyQTY => {
            checkProductQty(buyID.productID, buyQTY.productQTY);            
        });
    });
//END OF: function addToCart() {
}

function checkProductQty(buyID, buyQty) {

    connection.query(
        "SELECT * FROM products", 
        function(error, result) {
            if(error) throw error;

            var stockQty   = result[buyID - 1].stock_quantity,
                stockPrice = result[buyID - 1].price;

            if (stockQty >= buyQty) {
                fulfillOrder(buyID, buyQty, stockQty, stockPrice);
            } else {
                console.log("\n Insufficient quantity! Only " + stockQty + " available! Cannot sell " + buyQty);
                readProducts();
            }
        }
    );
//END OF: function checkProductQty(buyID, buyQty) {
}

function fulfillOrder(buyID, buyQty, stockQty, stockPrice) {

    let stockQtyPostSale = stockQty - buyQty,
        totalCost        = buyQty * stockPrice;

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [   
            {stock_quantity: stockQtyPostSale},
            {item_id: buyID}
        ],
        function(error, result) {   
            if(error) throw error;
        }
    );
    console.log(`Total Cost: ${totalCost} gil`);

    connection.end();  
//END OF: function fulfillOrder(buyID, buyQty, stockQty, stockPrice) {  
}