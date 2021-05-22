//TRY TUCKER'S METHOD FOR CALCULATION OBJECT
//THEN LINK TO SERVER SO CAN PUT CALCULATIONS SEMI PERM INTO SERVER

console.log('hello jS!');
$(handleReady);

function handleReady(){
    console.log('hello jquery!');
    getAllCalculations();

    $('#equalsButton').on('click', gatherCalculation);
    $('.operatorButton').on('click', highlightOperator);
    $('#clearButton').on('click', handleClear);

    newCalculation = {}; //tucker's method to get operator.
}
let newCalculation = {};
let calculationsCounter = 0; //doesn't need to be stored in server
// let tempArray = [];

function handleClear(){
    $('.numInput').val('');
    $('.operatorButton').removeClass('blue');
}

//gather operator on button click of operator button, push into array
//ADD ERROR IF USER CLICKS TWO OPERATORS BEFORE CLICKING = BUTTON
function highlightOperator(){
    // newCalculation.operator = $(this).text();
    // console.log(newCalculation);  
    $(this).toggleClass("blue"); //
}

function gatherCalculation(){

    let count = 0;
    $('.blue').each (function(i){
        count += i
        // console.log('log count', count);
        // console.log('logging this', $(this).text());
    })
    // console.log('loggin count out of loop', count); 
    if (count == 0 && $('.operatorButton').hasClass('blue')){
        if ($('#num1In').val() && $('#num2In').val()){

            $('.blue').each (function(i){
                 newCalculation.operator = $(this).text();
            }); 
                
            calculationsCounter += 1;
            newCalculation.count = calculationsCounter;
            newCalculation.num1 = $('#num1In').val();
            newCalculation.num2 = $('#num2In').val();

            $.ajax({
                url: '/calculations',
                method: 'POST',
                data: newCalculation
            }).then(response => {
                console.log('response', response);
            });
            getAllCalculations();
            console.log('calculation object', newCalculation);
        }
        else{
            console.log( 'no number somewhere');
            alert('Please enter a number in each field');
        }
    }
    else {
        console.log('ERROR ERROR ERROR');
        alert('Please choose ONE operator!');
    }
    // tempArray.push(newCalculation);
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