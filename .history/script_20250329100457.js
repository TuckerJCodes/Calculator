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
} else if (value === "√") {
  // Handle square root
  try {
    currentInput = Math.sqrt(evaluateExpression(currentInput)).toString();
  } catch (error) {
    currentInput = "Error";
  }
  updateDisplay();
} else if (["sin", "cos", "tan"].includes(value)) {
  // Handle trigonometric functions
  try {
    const radians = (Math.PI / 180) * evaluateExpression(currentInput); // Convert to radians
    if (value === "sin") currentInput = Math.sin(radians).toString();
    if (value === "cos") currentInput = Math.cos(radians).toString();
    if (value === "tan") currentInput = Math.tan(radians).toString();
  } catch (error) {
    currentInput = "Error";
  }
  updateDisplay();
} else {
  // Append the button value to the current input
  currentInput += value;
  updateDisplay();
}

function evaluateExpression(expression) {
  // Replace ^ with ** for exponentiation
  expression = expression.replace(/\^/g, "**");
  // Use Function constructor to safely evaluate the expression
  return new Function(`return ${expression}`)();
}
