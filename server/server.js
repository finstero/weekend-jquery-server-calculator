//bringing in express and body parser from node modules
const express = require('express');
const bodyParser = require('body-parser');
const calculationsArray = require('./modules/calculations.js');


//make a server called app
const app = express();
// run server on local host channel 5000
const PORT = 5000;

//serve static files when requested
app.use(express.static('server/public'));
//telling server to use the widget bodyparser, which allows us to find the data we send in post request
app.use(bodyParser.urlencoded({extended : true}));

app.get('/calculations', (req, res) =>{
    console.log('got to /calculations');
    //sends to client.js (or whatever requests)
    res.send(calculationsArray);
});




//telling server to listen for which port?
app.listen(PORT, () =>{
    console.log('RUNNING ON PORT:', PORT);
});