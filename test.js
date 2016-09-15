var fs = require("fs");

fs.readFile('test.txt', function(err, data){
    if (err) {
        throw new Error(err);
    }

    console.log(data.toString());
});




