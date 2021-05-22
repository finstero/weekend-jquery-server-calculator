
console.log('hello jS!');
$(handleReady);

function handleReady(){
    console.log('hello jquery!');
    //retrieve all calcs from server
    getAllCalculations();
    //click listeners for equals button, operator buttons and clear button
    $('#equalsButton').on('click', gatherCalculation);
    $('.operatorButton').on('click', highlightOperator);
    $('#clearButton').on('click', handleClear);

    //set calc object to empty on page load to put calc info into
    newCalculation = {}; //tucker's method to get operator.
}
// create global empty calc object to store info
let newCalculation = {};
//counter for calculations so I know how many calculations I've made
let calculationsCounter = 0; //doesn't need to be stored in server
// let tempArray = [];

// function to handle clear button. clears number inputs and resets color of operator button
function handleClear(){
    $('.numInput').val('');
    $('.operatorButton').removeClass('blue');
}

//gather operator on button click of operator button, push into array
//toggle operator button color so user knows which button they clicked
function highlightOperator(){
    // newCalculation.operator = $(this).text();
    // console.log(newCalculation);  
    $(this).toggleClass("blue"); //
}

//collect object info and send to server on click of =
function gatherCalculation(){
    //count corresponds to how many operator buttons have been toggled to a color
    // count 0 corresponds to one button and no buttons
    let count = 0;
    $('.blue').each (function(i){
        count += i
        // console.log('log count', count);
        // console.log('logging this', $(this).text());
    })
    // console.log('loggin count out of loop', count); 
    // if to check if only one operator button is chosen
    if (count == 0 && $('.operatorButton').hasClass('blue')){
        // if to check if there is a value in both number inputs
        if ($('#num1In').val() && $('#num2In').val()){
            //no user error path
            // puts operator with toggled clicked class into object array
            $('.blue').each (function(i){
                 newCalculation.operator = $(this).text();
            }); 
            //adds object properties with info    
            calculationsCounter += 1;
            newCalculation.count = calculationsCounter;
            newCalculation.num1 = $('#num1In').val();
            newCalculation.num2 = $('#num2In').val();
            //send object to server
            $.ajax({
                url: '/calculations',
                method: 'POST',
                data: newCalculation
            }).then(response => {
                console.log('response', response);
            });
            // right away, get array of calc objects from server and display to dom with function
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
} //end gatherCalculations

//gets objects from server that have solutions and append to dom
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