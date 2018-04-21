var tableFormatter = function (result, tableHeading, tableData) {

    this.result = result;
    this.tableHeading = tableHeading;
    this.tableData = tableData; 
    
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

    for (let value in this.tableHeading) {
        longestArr.push(0);
    }
    
    for (let value in this.tableData) {
        tableDataArr.push("result[i]."+ this.tableData[value]);
    }
    
    for (let i = 0; i < this.result.length; i++) {
        if (this.result[i].item_id.length > longestArr[0]) {
            longestArr[0] = this.result[i].item_id.length;
        } else if (this.result[i].product_name.length > longestArr[1]) {
            longestArr[1] = this.result[i].product_name.length;
        } else if (this.result[i].product_description.length > longestArr[2]) {
            longestArr[2] = this.result[i].product_description.length;
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
                    space(2), this.tableHeading[2], 
                    space(14), this.tableHeading[3], 
                    space(10), this.tableHeading[4]
                );
            } else {
                let idNameCol_i = (longestArr[0] - eval(tableDataArr[0]).toString().length)+4;
                let nameDesCol_i = (longestArr[1] - eval(tableDataArr[1]).length)+4;
                let desPriceCol_i = (longestArr[2] - eval(tableDataArr[2]).length)+5;     
            
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
    }
    
//END OF: var tableFormatter = function (result, tableHeading, tableData) {
}

module.exports = tableFormatter;