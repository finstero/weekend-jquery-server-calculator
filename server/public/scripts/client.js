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

    newCalculation = {}; //tucker's method to get operator. figure out!
}
let newCalculation = {};
let calculationsCounter = 0; //doesn't need to be stored in server
// let tempArray = [];

function handleClear(){
    $('.numInput').val('');
}

//gather operator on button click of operator button, push into array
//ADD ERROR IF USER CLICKS TWO OPERATORS BEFORE CLICKING = BUTTON
function getOperator(){
    newCalculation.operator = $(this).text();
    // console.log(newCalculation);   
}

function gatherCalculation(){
    // console.log('operator inside gatherCalculation', operatorArray);
    calculationsCounter += 1;
    // console.log('counter', calculationsCounter)
        newCalculation.count = calculationsCounter;
        newCalculation.num1 = $('#num1In').val();
        newCalculation.num2 = $('#num2In').val();
    console.log('full object', newCalculation);
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
        $('#tableBody').empty();
        for (let i=0; i<response.length; i++){
            $('#resultSpan').text(response[response.length-1].solution)
            $('#tableBody').append(`
                 <tr>
                    <th scope="row">${response[i].count}</th>
                    <td>${response[i].num1}</td>
                    <td>${response[i].operator}</td>
                    <td>${response[i].num2}</td>
                    <td>${response[i].solution}</td>
                </tr>
            `);
        }
    })
}