// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let previousInput = "";
  let operator = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (button.classList.contains("clear")) {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay();
      } else if (button.classList.contains("operator")) {
        if (currentInput === "") return;
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      } else if (value === "=") {
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
    console.log("Updating display with currentInput:", currentInput);
    console.log(display);
    display.value = currentInput || "0";
  }

  function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

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
