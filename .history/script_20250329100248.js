// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (button.classList.contains("clear")) {
        // Clear the display
        currentInput = "";
        updateDisplay();
      } else if (value === "=") {
        // Evaluate the expression
        try {
          currentInput = evaluateExpression(currentInput);
        } catch (error) {
          currentInput = "Error";
        }
        updateDisplay();
      } else {
        // Append the button value to the current input
        currentInput += value;
        updateDisplay();
      }
    });
  });

  function updateDisplay() {
    display.value = currentInput || "0";
  }

  function evaluateExpression(expression) {
    // Use Function constructor to safely evaluate the expression
    return new Function(`return ${expression}`)().toString();
  }
});
