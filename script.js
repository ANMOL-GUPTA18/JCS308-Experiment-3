
// Select HTML elements using querySelector()
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const message = document.querySelector("#message");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on the webpage
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        // Create a list item
        const li = document.createElement("li");

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.name;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        // Create Complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.className = "complete-btn";

        // Mark task as completed or incomplete
        completeBtn.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Delete the selected task
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        // Add elements to list item
        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
addBtn.addEventListener("click", function() {

    const taskName = taskInput.value.trim();

    // Check for empty input
    if (taskName === "") {
        message.textContent = "Please enter a task!";
        return;
    }

    // Add task to array
    tasks.push({
        name: taskName,
        completed: false
    });

    // Save updated tasks
    saveTasks();

    // Clear input and message
    taskInput.value = "";
    message.textContent = "";

    // Display updated task list
    displayTasks();
});

// Also allow Enter key to add a task
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

// Display saved tasks when page loads
displayTasks();
