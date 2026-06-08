const mammoth = require("mammoth");
const fs = require("fs");

mammoth.extractRawText({path: "../贵阳1.docx"})
    .then(function(result){
        const text = result.value; 
        console.log(text);
    })
    .catch(function(error) {
        console.error(error);
    });
