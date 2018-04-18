# bamazon-node-mysql-app

## Overview

`bamazon-node-mysql-app` is an Amazon-like storefront that will take in orders from the user and deplete stock from the store's inventory.

It is a command line interface app built with the `MySQL` and `node.js` technology stack. 

The theme is based on a typical shop found in the PS1 game [Final Fantasy Tactics](https://en.wikipedia.org/wiki/Final_Fantasy_Tactics).

## Getting Started

1. Copy and clone the repository to a directory of your choice. 
2. From your Terminal, navigate to the `bamazon-node-mysql-app` directory.
3. Install the required dependecies by running the command: `npm install`.
* This will install the mysql and inquirer packages.

## Using the App
1. Make sure you followed the instructions in the Getting Started section.
2. From your Terminal, navigate to the `bamazon-node-mysql-app/src` directory.
3. Launch the app with the command: `node bamazonCustomer`.
4. You'll first be presented with a table of products to buy, then prompted to select the ID of the product you would like to purchase, followed by the quantity you would like to buy. 
5. If the shop DOES NOT have enough inventory, you will be presented with an Insufficient quantity message.
* For example: "Insufficient quantity! Only 30 available! Cannot sell 31!
6. However, if the shop DOES have enough inventory, you will be presented with the total for your purchase (using the gil currency of course!).
7. The app will then deplete the quantity you purchased from the MySQL database and quit.
8. To place another order, simply run the `node bamazonCustomer` command again. 
* Keep in mind your previous order(s) will impact the inventory available. 