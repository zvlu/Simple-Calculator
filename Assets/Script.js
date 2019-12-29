// This initial function gets the history value of calc

function getHistory() {
     return document.getElementById('history-value').innerText;
}

// Now we want to show the user their history value 

function printHistory (num) {
    document.getElementById("history-value").innerText=num;
}
// Now we wnat to get the output data of the calc
function getOutput () {
    return document.getElementById("output-value").innerText;

}

function printOutput (num) {
   
    // Check to see if the are no values set to empty
    if (num == "") {
        document.getElementById("output-value").innerText=num;
    }
    // If its not empty use the comma seperated value (toLocaleString)
    else{
        document.getElementById("output-value").innerText=
        getFormattedNumber(num);
    }
   
}





// Formatted function reads the number and returns a comma seperated value 
// The toLocaleString() method returns a string with a language-sensitive representation of this number.
// Hence u pass "en" as english
function getFormattedNumber(num) {
    if (num == "-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;

}



function reverseNumFormat (num) {
    return Number(num.replace(/,/g,''));
}

//Operations 

var operator = document.getElementsByClassName("operator");
// use a for loop to access each operator one by one 
for (var i = 0; i< operator.length; i++){
    // add an event listener to each operator
    operator[i].addEventListener("click", function(){
        // logic for clear button
        // check if id is clear and then set history and output to empty
        if (this.id==="clear") {
            printHistory("");
            printOutput("");
        } 
        // logic for CE button (backspace)
        // first convert to number formatt so it doesnt mess up commas
        // converted to a string and and use the sub string function to remove last char and printed it out 
        if (this.id == "backspace") {
            var output = reverseNumFormat(getOutput()).toString();
            if (output) { // if output has a value
                output =  output.substr(0,output.length-1);
                printOutput(output);
            }
        }  
        else {
            var output = getOutput();
            var history = getHistory();
            if(output == "" && history != "") {
                if(isNaN(history[history.length -1])){
                 //use the sub string function to remove last char 
                  history = history.substr(0,history.length-1);  
                }
            }
            if(output !== "" || history != "") {
                // condition ? true:false
                output = output= "" ?
                // second value will be assigned if the ^^^ value isnt true after (?)
                output: reverseNumFormat(output);
                history = history + output;
                if(this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })

}
var number = document.getElementsByClassName("number");
// use a for loop to access each number one by one 
for (var i = 0; i < number.length; i++){
    // add an event listener to each number
    number[i].addEventListener("click", function(){
        // get the output with commas removed
        var output = reverseNumFormat(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    });

}
