const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

let currentNum = '';
let prevNum = '';
let operator = null;

const updateDisplay = () => {
  display.textContent = currentNum;
};

const clearDisplay = () => {
  currentNum = '';
  prevNum = '';
  operator = null;
  updateDisplay();
};

const appendNumber = (number) => {
  currentNum += number;
  updateDisplay();
};

const chooseOperator = (op) => {
  if (currentNum === '') return;
  if (prevNum !== '') calculate();
  operator = op;
  prevNum = currentNum;
  currentNum = '';
};

const calculate = () => {
  let result;
  const prev = parseFloat(prevNum);
  const current = parseFloat(currentNum);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }
  currentNum = result;
  operator = null;
  prevNum = '';
  updateDisplay();
};

// Convert buttons to array
Array.from(buttons).map((button) => {
  if (button.classList.contains('operator')) {
    button.addEventListener('click', () => chooseOperator(button.value));
  } else {
    button.addEventListener('click', () => appendNumber(button.value));
  }
});

equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);

