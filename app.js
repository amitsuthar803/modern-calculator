// Wait until the entire HTML document is loaded before running the JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get references to important HTML elements
  const inputField = document.getElementById("inputField");
  const resultDisplay = document.getElementById("resultDisplay");
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close");
  const clearBtn = document.querySelector(".clear-btn");

  // Initialize an empty string for the current input and an empty array for history
  let currentInput = "";
  let history = [];

  // Function to show or hide the sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("show");
  }

  // Attach event listeners to the hamburger and close buttons
  hamburger.addEventListener("click", toggleSidebar);
  closeBtn.addEventListener("click", toggleSidebar);

  // Function to clear the history
  function clearHistory() {
    history = []; // Clear the history array
    updateHistory(); // Update the history display
  }

  // Attach the clear history function to the clear button
  clearBtn.addEventListener("click", clearHistory);

  // Function to update the history display in the sidebar
  function updateHistory() {
    const historyContainer = sidebar.querySelector(".history-container"); // Get the history container
    // Reverse the history array to display the latest calculations first
    const reversedHistory = history.slice().reverse();
    // Create HTML for each history item with the calculation, result, and timestamp
    historyContainer.innerHTML = reversedHistory
      .map(
        (item) => `
    <p>
      <strong>Time:</strong> ${item.timestamp} <br>
      <strong>Calculation:</strong> ${item.expression} <br>
      <strong>Total:</strong> ${item.result}
    </p>
  `
      )
      .join("");
  }

  // Function to get the current time in a readable format
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString(); // Format the date and time
  }

  // Function to add a number to the current input
  window.appendNumber = (number) => {
    currentInput += number; // Add the number to the current input
    inputField.value = currentInput; // Update the input field display
  };

  // Function to add an operator to the current input
  window.appendOperator = (operator) => {
    if (currentInput) {
      // Only add the operator if there is already some input
      currentInput += ` ${operator} `; // Add spaces around the operator for readability
      inputField.value = currentInput; // Update the input field display
    }
  };

  // Function to calculate and display the result
  window.calculateResult = () => {
    try {
      // Use eval to evaluate the current input, replacing '÷' and '×' with '/' and '*'
      const result = eval(currentInput.replace("÷", "/").replace("×", "*"));
      resultDisplay.textContent = result; // Display the result

      // Add the calculation to the history with a timestamp
      history.push({
        expression: currentInput,
        result: result,
        timestamp: getCurrentTime(),
      });
      updateHistory(); // Update the history display
      currentInput = ""; // Clear the current input
      console.log(history);
    } catch (error) {
      resultDisplay.textContent = "Error"; // Display an error message if the calculation fails
    }
  };

  // Function to clear the current input and reset the display
  window.clearAll = () => {
    currentInput = ""; // Clear the current input
    inputField.value = ""; // Clear the input field display
    resultDisplay.textContent = "0"; // Reset the result display to 0
  };

  // Function to delete the last character from the current input
  window.deleteLast = () => {
    currentInput = currentInput.slice(0, -1); // Remove the last character from the current input
    inputField.value = currentInput; // Update the input field display
  };
});
