// Calculator functionality
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      // Clear the display if it shows "Error" or "NaN"
      if (currentInput === "Error" || currentInput === "NaN") {
        currentInput = "";
      }

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
        updateDisplay(true); // Pass true to indicate this is a result
      } else if (["sin", "cos", "tan", "√"].includes(value)) {
        // Append the function name to the input
        currentInput += value + "(";
        updateDisplay();
      } else {
        // Append the button value to the current input
        currentInput += value;
        updateDisplay();
      }
    });
  });

  function updateDisplay(isResult = false) {
    display.value = currentInput || "0";
    if (isResult) {
      display.scrollLeft = 0; // Scroll to the start for results
    } else {
      display.scrollLeft = display.scrollWidth; // Scroll to the end for input
    }
  }

  function evaluateExpression(expression) {
    // Replace ^ with ** for exponentiation
    expression = expression.replace(/\^/g, "**");

    // Insert multiplication (*) between a number/closing parenthesis and a function or √
    expression = expression.replace(/(\d|\))(?=(sin|cos|tan|√))/g, "$1*");

    // Insert multiplication (*) between a number and an opening parenthesis
    expression = expression.replace(/(\d)(?=\()/g, "$1*");

    // Replace √ with Math.sqrt
    expression = expression.replace(/√\(/g, "Math.sqrt(");

    // Replace sin, cos, tan with Math.sin, Math.cos, Math.tan
    expression = expression.replace(/sin\(/g, "Math.sin((Math.PI / 180) * ");
    expression = expression.replace(/cos\(/g, "Math.cos((Math.PI / 180) * ");
    expression = expression.replace(/tan\(/g, "Math.tan((Math.PI / 180) * ");

    console.log(expression);
    // Use Function constructor to safely evaluate the expression
    return new Function(`return ${expression}`)();
  }
});
