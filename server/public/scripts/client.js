//TRY TUCKER'S METHOD FOR CALCULATION OBJECT
//THEN LINK TO SERVER SO CAN PUT CALCULATIONS SEMI PERM INTO SERVER

console.log('hello jS!');
$(handleReady);

function handleReady(){
    console.log('hello jquery!');
    getAllCalculations();

    $('#equalsButton').on('click', gatherCalculation);
    $('.operatorButton').on('click', getOperator);
    $('#clearButton').on('click', handleClear);
    // let newObj = {}; //tucker's method to get operator. figure out!
}

let operatorArray = [];
let calculationsCounter = 0; //doesn't need to be stored in server
// let tempArray = [];

function handleClear(){
    $('.numInput').val('');
}

//gather operator on button click of operator button, push into array
//ADD ERROR IF USER CLICKS TWO OPERATORS BEFORE CLICKING = BUTTON
function getOperator(){
    if (calculationsCounter == operatorArray.length){
    let operator = $(this).text();
    // console.log('operator', operator);
        operatorArray.push(operator);
    }
    else {
        // console.log('error! please only push one operator button');
        // console.log(calculationsCounter);
        operatorArray.pop();
    }
    // console.log('operator array in get operator', operatorArray);
}

function gatherCalculation(){
    // console.log('operator inside gatherCalculation', operatorArray);
    calculationsCounter += 1;
    // console.log('counter', calculationsCounter)
    let newCalculation = {
        count: calculationsCounter,
        num1: $('#num1In').val(),
        operator: operatorArray[calculationsCounter -1],
        num2: $('#num2In').val(),
        // solution: 'filler' //add in server
    } 
    $.ajax({
        url: '/calculations',
        method: 'POST',
        data: newCalculation
    }).then(response => {
        console.log('response', response);
    });
    getAllCalculations();
    console.log('calculation object', newCalculation);
    // tempArray.push(newCalculation);
    // console.log('array of objects', tempArray);
    // $('.numInput').val('');
}


function getAllCalculations(){   
    $.ajax({
        url: '/calculations',
        method: 'GET'
    }).then(response =>{
        console.log('calculations array with solutions', response);
        $('#resultSpan').empty();
        for (let i=0; i<response.length; i++){
            $('#resultSpan').text(response[response.length-1].solution)
        }
    })
}