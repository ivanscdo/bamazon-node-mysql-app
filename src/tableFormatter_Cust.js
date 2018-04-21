var tableFormatter = function (result, tableHeading) {

    this.result = result;
    this.tableHeading = tableHeading;
    
    var longestArr = [];
    var tableDataArr = [];

    function space(length) {
        var spaceChar = " ";
        var wholeSpace = [];
        
        for (let i = 0 ;i < length;i++) {
            wholeSpace.push(spaceChar);
        }
        
        return wholeSpace.join("");

    //END OF: function space(length) {
    }

    // preparing array to find longest name in each column
    for (let value in this.tableHeading) {
        longestArr.push(0);
    }
    
    // preparing code for use in this.consoleLog func
    for (let i = 0; i < this.result.length; i++) {
        for (let value in this.result[i]) {
            tableDataArr.push("result[i]." + value);
        }
        break;
    }
    
    // finding and storing length of longest name in each column
    for (let i = 0; i < this.result.length; i++) {

        var itemID = this.result[i].item_id.toString(),
            name   = this.result[i].product_name,
            desc   = this.result[i].product_description;

        if (itemID.length > longestArr[0]) {
            longestArr[0] = itemID.length;

        } else if (name.length > longestArr[1]) {
            longestArr[1] = name.length;

        } else if (desc.length > longestArr[2]) {
            longestArr[2] = desc.length;
        } 

    //END OF: for (let i = 0; i < result.length; i++) {
    }
    
    this.consoleLog = function() {

        console.log("\n");
        
        for (let i = -1; i < this.result.length; i++) {
            let leftPadding = 5;
            
            if ( i === -1 ) {
                console.log(
                    space(leftPadding), this.tableHeading[1], 
                    space(longestArr[0]), this.tableHeading[2], 
                    space(longestArr[1]), this.tableHeading[3], 
                    space(longestArr[2]), this.tableHeading[4]
                );
            } else {
                let idNameCol_i = (longestArr[0] - eval(tableDataArr[0]).toString().length)+2;
                let nameDesCol_i = (longestArr[1] - eval(tableDataArr[1]).length)+4;
                let desPriceCol_i = (longestArr[2] - eval(tableDataArr[2]).toString().length)+11;
            
                console.log(
                    space(leftPadding), eval(tableDataArr[0]),
                    space(idNameCol_i), eval(tableDataArr[1]),
                    space(nameDesCol_i), eval(tableDataArr[2]),
                    space(desPriceCol_i), eval(tableDataArr[3])
                );
            }

        //END OF: for (let i = -1; i < result.length; i++) {
        }
        console.log("\n");
    //END OF: this.consoleLog = function() {
    }

    
//END OF: var tableFormatter = function (result, tableHeading) {
}

module.exports = tableFormatter;