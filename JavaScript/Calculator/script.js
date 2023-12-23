

function Add(value) {
    // Access the ID of the clicked button
    let num = document.getElementById("Answer").innerText;

    if (num == 0){
        document.getElementById("Answer").innerText = value;
    } else {
        document.getElementById("Answer").innerText += value;
    } 
}

function allclear(){
    document.getElementById("Answer").innerText = 0;
}

function del(){
    let currentContent = document.getElementById('Answer').innerText;

    // Check if there's at least one character
    if (currentContent.length > 0) {
        // Remove the last character
        let newContent = currentContent.slice(0, -1);

        // Update the content of the div
        if(currentContent.slice(0, -1) == 0){
            document.getElementById('Answer').innerText = 0;
        } else{
            document.getElementById('Answer').innerText = newContent;
        }
       
}

}

function character(value) {
    // Access the ID of the clicked button
    let num = document.getElementById("Answer").innerText;
    
    // Check if the string is not empty before getting the last character
    let latestInput = num.length > 0 ? num.slice(-1) : '';

    if (!(latestInput === '+' || latestInput === '-' || latestInput === '*' || latestInput === '/' || latestInput === '.' || latestInput === '%')){
        document.getElementById("Answer").innerText += value;
    }
}

function result(){
    let value = document.getElementById('Answer').innerText;

    let result = evaluateExpression(value);
    document.getElementById('Answer').innerText = result;

}

function evaluateExpression(expression) {
    // Split the expression into numbers and operators
    var tokens = expression.match(/[+\-*/]|\d+\.\d+|\d+/g) || [];

    // Array to store values
    var values = [];
    // Array to store operators
    var operators = [];

    // Operator precedence map
    var precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    // Helper function to perform an operation
    function performOperation() {
        var operator = operators.pop();
        var right = values.pop();
        var left = values.pop();

        switch (operator) {
            case '+':
                values.push(left + right);
                break;
            case '-':
                values.push(left - right);
                break;
            case '*':
                values.push(left * right);
                break;
            case '/':
                values.push(left / right);
                break;
        }
    }

    // Iterate through each token
    tokens.forEach(function(token) {
        if (!isNaN(token)) {
            // If the token is a number, push it to the values array
            values.push(parseFloat(token));
        } else {
            // If the token is an operator
            while (
                operators.length > 0 &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                // Pop operators with higher or equal precedence from the stack and perform operations
                performOperation();
            }
            // Push the current operator to the stack
            operators.push(token);
        }
    });

    // Perform any remaining operations in the stack
    while (operators.length > 0) {
        performOperation();
    }

    // The result is the only value left in the values array
    return values[0];
}