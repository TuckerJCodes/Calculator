// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let previousInput = "";
  let operator = null;

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-key");

      if (key === "C") {
        // Clear the display
        updateDisplay("");
      } else if (key === "=") {
        // Evaluate the expression and update the display
        try {
          const result = eval(display.value); // Evaluate the expression
          updateDisplay(result);
        } catch (error) {
          updateDisplay("Error"); // Handle invalid expressions
        }
      } else {
        // Append the key to the display
        updateDisplay(display.value + key);
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
