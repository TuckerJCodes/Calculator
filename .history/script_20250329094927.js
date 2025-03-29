// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let previousInput = "";
  let operator = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      // console.log(value);
      if (button.classList.contains("clear")) {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay();
      } else if (button.classList.contains("operator")) {
        console.log(currentInput);
        if (currentInput === "") return;
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      } else if (value === "=") {
        console.log(currentInput, previousInput, operator);
        if (currentInput === "" || previousInput === "" || operator === null)
          return;
        currentInput = calculate(previousInput, currentInput, operator);
        previousInput = "";
        operator = null;
        updateDisplay();
      } else {
        currentInput += value;
        updateDisplay();
      }
    });
  });

  function updateDisplay() {
    display.value = currentInput || "0";
  }

  function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    console.log("Calculating:", a, operator, b);

    switch (operator) {
      case "+":
        return (a + b).toString();
      case "-":
        return (a - b).toString();
      case "*":
        return (a * b).toString();
      case "/":
        return b !== 0 ? (a / b).toString() : "Error";
      default:
        return "";
    }
  }
});
