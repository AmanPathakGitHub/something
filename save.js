const fs = require('fs');

function saveAsJson(data){
    fs.writeFileSync('SaveData.json', JSON.stringify(data) , function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function readData(){
    return fs.readFileSync('./SaveData.json', (err, data) =>{ if(err) throw err;});
}
     


module.exports.saveAsJson = saveAsJson;
module.exports.readData = readData;
