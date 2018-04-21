const   mysql    = require("mysql"),
        inquirer = require("inquirer"),
        tableFormatter = require("./tableFormatter_Mgr.js");

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
    3: "Price", 
    4: "Quantity"
};

connection.connect(function(error) {
    if(error) throw error;

    console.log("connected as id " + connection.threadId + "\n");
    menuOptions();
});

function menuOptions() {
    inquirer.prompt(
        {
            type: "list", 
            message: "Make a selection:",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ],
            name: "selection"
        }
    ).then(response =>{

        switch (response.selection) {
            case "View Products for Sale":
                return viewProducts();

            case "View Low Inventory":
                return viewLowInventory();

            case "Add to Inventory":
                return viewProducts(addInventory_Inquirer);

            case "Add New Product":
                return addProduct_Inquirer();    
        }

    });
//END OF: function menuOptions() {
}



function viewProducts(callback) {
    connection.query(
        "SELECT item_id, product_name, price, stock_quantity FROM products", 
        function(error, result) {
            if(error) throw error;

            let table = new tableFormatter(result, tableHeading);
            
            table.consoleLog();

            if (callback) {
                callback(result);
            } else {
                connection.end();
            }
            
        }
    );
}

function viewLowInventory() {
    connection.query(
        "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", 
        function(error, result) {
            if(error) throw error;

            let table = new tableFormatter(result, tableHeading);
            table.lowInv();
            connection.end();
        }
        
    );

    
}

function addInventory_Inquirer(result) {
    inquirer.prompt(
        {
            type: "input", 
            message: "Enter the ID you would like to add:",
            name: "id",
            validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
        }
    ).then(item => {
        return inquirer.prompt(
            {
                type: "input", 
                message: "Enter the Quantity you would like to add:",
                name: "qty",
                validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0) ? true : false
            }
        ).then(stock => {

            addInventory(item.id, stock.qty, result);
        })

    })
}

function addInventory(id, qty, result) {
    let existingQty = 0;
    let qtyToAdd = 0;

    for (let i = 0; i < result.length; i++) {
        for (let column in result[i]) {
            if (result[i][column] === Number(id) ) {
            existingQty = result[i].stock_quantity;
            break;
            }
        }
    }

    qtyToAdd = Number(qty) + existingQty;

    connection.query(
        "UPDATE products SET ? WHERE ?", 
        [
            {
                stock_quantity: qtyToAdd
            },
            {
                item_id: id
            }
        ],
        function(error, result) {
            if (error) throw error;
            console.log(`${result.affectedRows} products updated!`)
        }
    )
    viewProducts();
}

function addProduct_Inquirer() {
    inquirer.prompt(
        [
            {
                type: "input", 
                message: "Enter the department_name of the product you would like to add:",
                name: "dept",
                // validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
            },
            {
                type: "input", 
                message: "Enter the product_name of the product you would like to add:",
                name: "name",
                // validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
            },
            {
                type: "input", 
                message: "Enter the product_description of the product you would like to add:",
                name: "desc",
                // validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
            },
            {
                type: "input", 
                message: "Enter the price of the product you would like to add:",
                name: "price",
                // validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
            },
            {
                type: "input", 
                message: "Enter the stock_quantity of the product you would like to add:",
                name: "qty",
                // validate: (arg) => (isNaN(arg)===false && parseInt(arg)>0 && parseInt(arg)<11) ? true : false
            }

        ]
    ).then(add => {
        addProduct(add.dept, add.name, add.desc, add.price, add.qty);
        })
}

function addProduct(dept, name, desc, price, qty) {
    connection.query(
        "INSERT INTO products SET ?", 
        {
            department_name: dept,
            product_name: name,
            product_description: desc,
            price: price,
            stock_quantity: qty
        },
        function(error, results) {
          console.log(results.affectedRows + " product inserted!\n");        
        }
        
    )
    viewProducts();
}