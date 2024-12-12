const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const viewHistoryBtn = document.getElementById("view-history-btn");
const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const closeHistoryBtn = document.getElementById("close-history-btn");

let tasks = [];
let history = [];

// Add task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    tasks.push(taskText);
    updateTaskList();
    taskInput.value = "";
});

// Update task list
function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <span>${index + 1}. ${task}</span>
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // Edit task
        taskDiv.querySelector(".edit").addEventListener("click", () => {
            const newTask = prompt("Edit task:", task);
            if (newTask) {
                tasks[index] = newTask.slice(0, 25);
                updateTaskList();
            }
        });

        // Delete task
        taskDiv.querySelector(".delete").addEventListener("click", () => {
            // Add to history with proper index
            history.push({ text: task, index: tasks.length });
            tasks.splice(index, 1);
            updateTaskList();
        });

        taskList.appendChild(taskDiv);
    });
}

// View history
viewHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = history
        .map((item, index) => `<li>${index + 1}. ${item.text}</li>`)
        .join("");
    historyModal.classList.remove("hidden");
});

// Close history
closeHistoryBtn.addEventListener("click", () => {
    historyModal.classList.add("hidden");
});
