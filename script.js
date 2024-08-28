function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "*":
            return firstNumber * secondNumber;
        case "/":
            return secondNumber === 0 ? "Error" : firstNumber / secondNumber;
        default:
            return "Error";
    }
}

function roundNumber(number) {
    return Math.round(number * 1000000) / 1000000;
}

function updateDisplay() {
    const display = document.querySelector("#display");
    display.innerText = displayValue;
    if(displayValue.length > 11) {
        display.innerText = displayValue.substring(0, 11);
    }
}

function clearDisplay() {
    firstNumber = null;
    secondNumber = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
    displayValue = "0";
}

function inputNumber(number) {
    if(firstOperator === null) {
        if(displayValue === "0" || displayValue === 0 || displayValue === firstNumber) {
            displayValue = number;
        }else {
            displayValue += number;
        }
    } else {
        if(displayValue === firstNumber) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    } 
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if(result === "Error") {
            displayValue = "Error";
        } else {
            displayValue = roundNumber(result).toString();
            firstNumber = displayValue;
            result = null;
        }
    } else if(firstOperator != null && secondOperator != null) {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if(result === "Error") {
            displayValue = "Error";
        } else {
            secondOperator = operator;
            displayValue = roundNumber(result).toString();
            firstNumber = displayValue;
            result = null;
        }
    } else { 
        firstOperator = operator;
        firstNumber = displayValue;
    }
}

function inputEqual() {
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator !== null) {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        if(result === "Error") {
            displayValue = "Error";
        } else {
            displayValue = roundNumber(result).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        if(result === "Error") {
            displayValue = "Error";
        } else {
            displayValue = roundNumber(result).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputSign(number) {
    displayValue = (number * -1).toString();
}

function inputDecimal(dot) {
    if(displayValue === firstNumber || displayValue === secondNumber) {
        displayValue = "0" + dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputPercent(number) {
    displayValue = (number / 100).toString();
}

function inputBackspace() {
    if(displayValue.length <= 1) {
        displayValue = "0";
    } else {
        displayValue = displayValue.substring(0, displayValue.length - 1);
    }
}

function clickButtons() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if(button.classList.contains("number")) {
                inputNumber(button.value);
                updateDisplay();
            } else if(button.classList.contains("operator")) {
                inputOperator(button.value);
                updateDisplay();
            } else if(button.classList.contains("equal")) {
                inputEqual();
                updateDisplay();
            } else if(button.classList.contains("sign")) {
                inputSign(displayValue);
                updateDisplay();
            } else if(button.classList.contains("decimal")) {
                inputDecimal(button.value);
                updateDisplay();
            } else if(button.classList.contains("percent")) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(button.classList.contains("backspace")) {
                inputBackspace();
                updateDisplay();
            } else if(button.classList.contains("clear")) {
                clearDisplay();
                updateDisplay();
            }
        });
    });
}

let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let displayValue = "0";

window.addEventListener("keydown", (e) => {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
})

updateDisplay();

clickButtons();