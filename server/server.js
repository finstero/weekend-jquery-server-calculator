//bringing in express and body parser from node modules
const express = require('express');
const bodyParser = require('body-parser');
//stores all calc objects with solutions in array
const calculationsArray = require('./modules/calculations.js');


//make a server called app
const app = express();
// run server on local host channel 5000
const PORT = 5000;

//serve static files when requested
app.use(express.static('server/public'));
//telling server to use the widget bodyparser, which allows us to find the data we send in post request
app.use(bodyParser.urlencoded({extended : true}));

//calculates solution based on object info
//is there a better way to get operator if it's a string?
function calculateSolution(object){
    if (object.operator == '+'){
        object.solution = Number(object.num1) + Number(object.num2)
    }
    else if (object.operator == '-'){
        object.solution = Number(object.num1) - Number(object.num2)
    }
    else if (object.operator == '*'){
        object.solution = Number(object.num1) * Number(object.num2)
    }
    else if (object.operator == '/'){
        object.solution = Number(object.num1) / Number(object.num2)
    }
}

// get route for calc objs
app.get('/calculations', (req, res) =>{
    console.log('got to /calculations');
    //sends to client.js (or whatever requests)
    // console.log('calculations array with solutions', calculationsArray);
    res.send(calculationsArray);
});

//post route for calc objs. adds solution to obj. as property
app.post('/calculations', (req, res) =>{
    console.log(req.body);
    calculateSolution(req.body);
    calculationsArray.push(req.body);
    res.sendStatus(201);
})


//telling server to listen for which port?
app.listen(PORT, () =>{
    console.log('RUNNING ON PORT:', PORT);
});