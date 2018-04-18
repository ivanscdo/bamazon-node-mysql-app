
const   mysql    = require("mysql"),
        inquirer = require("inquirer");

const connection = mysql.createConnection({
host: "localhost", 
port: 3306, 
user: "root", 
password: "", 
database: "bamazon"
});

var setQuery = process.argv[2];
var whereQuery = process.argv[3];

connection.connect(function(error) {
    if(error) throw error;

    console.log("connected as id " + connection.threadId + "\n");
    readProducts();     
});

function readProducts() {
    // console.log("readProducts();");

    connection.query(
        "SELECT * FROM products", 
        function(error, result) {
            if(error) throw error;

            tableFormatter(result);
        }
    );
// addToCart();
// connection.end();
}

function tableFormatter(result) {
    // console.log("tableFormatter();");
    var longestProduct = 0;
    var longestDes = 0;
    var longestID = 0;

    var tableData = {
        1: "item_id", 
        2: "product_name", 
        3: "product_description", 
        4: "price"
    };

    var tableDataArr = [];

    var tableHeading = {
        1: "ID", 
        2: "Name", 
        3: "Description", 
        4: "Price"
    };

    for (let value in tableData) {
        tableDataArr.push("result[i]."+tableData[value]);
    }

    function space(length) {
        var spaceChar = " ";
        var wholeSpace = [];

        for (let i = 0 ;i < length;i++) {
            wholeSpace.push(spaceChar);
        }

        return wholeSpace.join("");
    //END OF: function space(length) {
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i].product_name.length > longestProduct) {
            longestProduct = result[i].product_name.length;
            // productName = result[i].product_name
        } else if (result[i].product_description.length > longestDes) {
            longestDes = result[i].product_description.length;
            // productName = result[i].product_name
        } else if (result[i].item_id.length > longestID) {
            longestID = result[i].item_id.length;
        }
    //END OF: for (let i = 0; i < result.length; i++) {
    }



    for (let i = -1; i < result.length; i++) {
        let leftPadding = 5;

        if ( i === -1 ) {
            console.log(
                space(leftPadding), tableHeading[1], 
                space(2), tableHeading[2], 
                space(14), tableHeading[3], 
                space(10), tableHeading[4]
            );
        } else {
            let idNameCol_i = (longestID - eval(tableDataArr[0]).toString().length)+4;
            let nameDesCol_i = (longestProduct - eval(tableDataArr[1]).length)+4;
            let desPriceCol_i = (longestDes - eval(tableDataArr[2]).length)+5;     

            console.log(
                space(leftPadding), eval(tableDataArr[0]),
                space(idNameCol_i), eval(tableDataArr[1]),
                space(nameDesCol_i), eval(tableDataArr[2]),
                space(desPriceCol_i), eval(tableDataArr[3])
            );

        }
    //END OF: for (let i = -1; i < result.length; i++) {
    }


    addToCart();



//END OF: function tableFormatter(result) {
}

function addToCart() {
    // console.log("addToCart()");
    inquirer.prompt(
        {
            type: "input",
            message: "ID of product you'd like to buy?",
            name: "productID",
            validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
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
    // console.log(`checkProductQTY(${buyID}, ${buyQty});`);

    connection.query(
        "SELECT * FROM products", 
        function(error, result) {
            if(error) throw error;

            var stockQty   = result[buyID - 1].stock_quantity,
                stockPrice = result[buyID - 1].price;

            if (stockQty >= buyQty) {
                fulfillOrder(buyID, buyQty, stockQty, stockPrice);
            } else {
                console.log("Insufficient quantity! Only " + stockQty + " available! Cannot sell " + buyQty);
                addToCart();
            }
        }
    );
//END OF: function checkProductQty(buyID, buyQty) {
}

function fulfillOrder(buyID, buyQty, stockQty, stockPrice) {
    // console.log(`fulfillOrder(${buyID}, ${buyQty}, ${stockQty});`);

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