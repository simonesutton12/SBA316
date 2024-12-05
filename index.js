<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <style>
    body { font-family: Arial, sans-serif; }
    #to-do-list { list-style: none; padding: 0; }
    .to-do-item { padding: 10px; border: 1px solid #ddd; margin-top: 5px; }
  </style>
</head>
<body>
  <main>
    <h1>To-Do List</h1>
    <input type="text" id="new-task-input" placeholder="Enter new task">
    <button id="add-task-button">Add Task</button>
    <ul id="to-do-list"></ul>
  </main>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const mainEl = document.querySelector("main");

      // Select elements using getElementById and querySelector
      const inputEl = document.getElementById("new-task-input");
      const addButtonEl = document.querySelector("#add-task-button");
      const toDoListEl = document.getElementById("to-do-list");

      // Add event listener to add button
      addButtonEl.addEventListener("click", function() {
        const taskText = inputEl.value.trim();
        if (taskText !== "") {
          addTask(taskText);
          inputEl.value = ""; // Clear input field
        }
      });

      // Function to add a task to the to-do list
      function addTask(taskText) {
        const liEl = document.createElement("li");
        liEl.classList.add("to-do-item");
        liEl.textContent = taskText;

        // Append the new task to the list
        toDoListEl.appendChild(liEl);

        // Navigate parent-child and sibling elements
        navigateElements(liEl);
      }

      // Function to navigate parent-child and sibling elements
      function navigateElements(liEl) {
        const parentEl = liEl.parentElement;
        const previousSibling = liEl.previousElementSibling;
        const nextSibling = liEl.nextElementSibling;

        console.log("Parent Element:", parentEl);
        console.log("Previous Sibling:", previousSibling);
        console.log("Next Sibling:", nextSibling);
      }

      // Iterate over a collection of elements to create a task
      const initialTasks = ["Buy groceries", "Clean the house", "Pay bills"];
      initialTasks.forEach(task => addTask(task));
    });
  </script>
</body>
</html>
