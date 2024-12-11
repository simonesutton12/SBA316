// Select element ID and Query selector
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('#taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');
const dayNav = document.getElementById('dayNav');
const taskContainer = document.getElementById('taskContainer');

let currentDay = 'Monday';
let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Initialize tasks
function initTasks() {
    taskList.innerHTML = '';
    const dayTasks = tasks[currentDay] || [];
    dayTasks.forEach((task, index) => {
        addTaskToDOM(task.text, index, task.completed);
    });
    updateTaskStats();
}

// Event listener for form submission
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskIndex = saveTask(taskText);
        addTaskToDOM(taskText, taskIndex);
        taskInput.value = '';
        taskInput.focus();
    }
});

// Event listener for day navigation
dayNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        currentDay = event.target.getAttribute('data-day');
        initTasks();
    }
});

// Function to add a task to the DOM
function addTaskToDOM(taskText, index, completed = false) {
    const taskItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    const deleteButton = document.createElement('button');
    
    taskSpan.textContent = `${index + 1}. ${taskText}`;
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    if (completed) {
        taskSpan.classList.add('completed');
    }

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskSpan.addEventListener('click', () => {
        taskSpan.classList.toggle('completed');
        updateTaskCompletion(index, taskSpan.classList.contains('completed'));
        updateTaskStats();
    });

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        deleteTask(index);
        updateTaskStats();
    });

    updateTaskStats();
}

// Function to save a task
function saveTask(taskText) {
    if (!tasks[currentDay]) {
        tasks[currentDay] = [];
    }
    const taskIndex = tasks[currentDay].length;
    tasks[currentDay].push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return taskIndex;
}

// Function to update task completion
function updateTaskCompletion(index, completed) {
    tasks[currentDay][index].completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index) {
    tasks[currentDay].splice(index, 1);
    tasks[currentDay].forEach((task, i) => {
        taskList.children[i].querySelector('span').textContent = `${i + 1}. ${task.text}`;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update task statistics
function updateTaskStats() {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll('.completed').length;
    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// DOM event-based validation
taskInput.addEventListener('input', () => {
    const isValid = taskInput.checkValidity();
    taskInput.style.borderColor = isValid ? 'green' : 'red';
});

// Initialize tasks for the first time
initTasks();

