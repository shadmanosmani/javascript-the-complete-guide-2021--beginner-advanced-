const defaultResult = 0;

let currentResult = defaultResult;

let logEntries = [];

// let calculationDescription = defaultResult + " + 10 ";

let calculationDescription = "0";

function getUserInput() {
  return parseInt(userInput.value);
}

function add() {
  const enteredNumber = getUserInput();
  //   const input = +userInput.value;
  calculationDescription = `${currentResult} + ${enteredNumber}`;
  const logEntry = {
    operation: "ADD",
    previousResult: currentResult,
    number: enteredNumber,
    result: currentResult,
  };
  logEntries.push(logEntry);
  console.log(logEntry.operation);
  console.log(logEntries);
  currentResult += enteredNumber;
  outputResult(currentResult, calculationDescription);
}

function subtract() {
  const enteredNumber = getUserInput();
  //   const input = +userInput.value;
  calculationDescription = `${currentResult} - ${enteredNumber}`;
  currentResult -= enteredNumber;
  outputResult(currentResult, calculationDescription);
}

function multiply() {
  const enteredNumber = getUserInput();
  //   const input = +userInput.value;
  calculationDescription = `${currentResult} * ${enteredNumber}`;
  currentResult *= enteredNumber;
  outputResult(currentResult, calculationDescription);
}

function divide() {
  const enteredNumber = getUserInput();
  //   const input = +userInput.value;
  calculationDescription = `${currentResult} / ${enteredNumber}`;
  currentResult /= enteredNumber;
  outputResult(currentResult, calculationDescription);
}

const clickEvent = "click";

addBtn.addEventListener(clickEvent, add);
subtractBtn.addEventListener(clickEvent, subtract);
multiplyBtn.addEventListener(clickEvent, multiply);
divideBtn.addEventListener(clickEvent, divide);
