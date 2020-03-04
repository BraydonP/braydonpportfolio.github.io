// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear tasks event
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// getTasks (from local storage) function
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement("li");
        // Add class to li
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a");
        // Add class to link
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = "<i class=\"fa fa-remove\"></i>";
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// addTask function
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task!");
    }

    // Create li element
    const li = document.createElement("li");
    // Add class to li
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = "<i class=\"fa fa-remove\"></i>";
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    e.preventDefault(); // default behaviour is form submit
}

// storeTaskInLocalStorage function
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// removeTask function
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// removeTaskFromLocalStorage function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        //  if the actual text of the task matches the current task in the itteration, then we know that's the one we want to delete
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clearTasks function
function clearTasks(e) {
    // One way to do it
    // taskList.innerHTML = "";

    // Faster way
    // https://jsperf.com/innerhtml-vs-removechild
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    clearTasksFromLocalStorage();
}

// clearTasksFromLocalStorage function
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filterTasks function
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // gives whatever is being typed in

    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}