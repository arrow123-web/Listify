const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const colorChange = document.getElementById("colorButton")
const taskTimeInput = document.getElementById("task-time");




function addTask(taskText = "", taskTime = "", isDone = false) {
    if (typeof taskText !== "string" || !taskText) taskText = taskInput.value.trim().toUpperCase();
    if (typeof taskTime !== "string" || !taskTime) taskTime = taskTimeInput.value.trim();




    if(taskText !== "") {
        
        const li = document.createElement("li");
        
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        taskTextSpan.classList.add("task-text");

        const taskTimeSpan = document.createElement("span");
        const dueDate = new Date(taskTime);
        taskTimeSpan.textContent =` - Due: ${isNaN(dueDate) ? "Invalid Date" : dueDate.toLocaleString()}`;
        taskTimeSpan.classList.add("task-time");


        const doneBtn = document.createElement("input");
        doneBtn.type = "checkbox";
        doneBtn.checked = false;
        doneBtn.classList.add("done-btn");
        doneBtn.onclick = function () {
            if(doneBtn.checked) {
                setTimeout(() => {
                    li.classList.add("completed-task");
                    li.textContent = `${taskText} - Done`;
                    taskTimeSpan.style.display = "none"; // Hide due time
                    doneBtn.style.display = "none";
                    li.appendChild(deleteBtn);
                    saveTasks();
                }, 200);
                
            }
           
        }

        
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn"); 
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };
    
     li.appendChild(doneBtn);
     li.appendChild(taskTextSpan);
     li.appendChild(taskTimeSpan);
     li.appendChild(deleteBtn);
     taskList.appendChild(li);
     saveTasks();

     taskInput.value = "";
     taskTimeInput.value = ""
} else {
    alert("Please enter a task.");
}
};

const container = document.querySelector(".container")
const seeLessButton = document.getElementById("seeLess-btn")
seeLessButton.addEventListener("click", () => toggleVisibility());


function toggleVisibility() {
         
            
    if(taskList.classList.contains("hidden")) {
        taskList.classList.remove("hidden", "fadeOut");
        taskList.classList.add("fadeIn");
        taskList.style.display = "flex";
        container.classList.remove("contract");
        container.classList.add("expand");
        seeLessButton.textContent = "See Less";
    } else {
        taskList.classList.remove("fadeIn");
        taskList.classList.add("fadeOut");
        container.classList.remove("expand");
        container.classList.add("contract")
        setTimeout(() => {
            taskList.classList.add("hidden");
            taskList.style.display = "none"; 
            container.classList.remove("expand");
            container.classList.add("contract");
        }, 500);
      
        seeLessButton.textContent = "Show more"
    }
}

addBtn.addEventListener("click", () => addTask());

taskInput.addEventListener("keypress", function (event) {
    if(event.key === "Enter") {
        addTask();
    }
});

function changeColor() {
    document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    
}



function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector(".task-text").textContent;
        let time = li.querySelector(".task-time").textContent.replace(" - Due: ", "").trim();
        let isDone = li.querySelector(".done-btn").checked;
        tasks.push({ text, time, isDone});  
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if(savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            addTask(task.text, task.time, task.isDone)
        })
    } 
}
    

const deleteAllButton = document.getElementById("deleteAll-btn");

deleteAllButton.addEventListener("click", function () {
    taskList.innerHTML = ""; // Remove all task elements
    localStorage.removeItem("tasks"); // Clear tasks from local storage
});


colorChange.addEventListener("click", changeColor);

const currentDate = new Date();
const taskTime = new Date(taskTimeInput.value); 
if(taskTime < currentDate) {
    console.log('Date needs to be higher than the current date');
}

 document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    taskList.classList.add("hidden");
    seeLessButton.textContent = "Show more";
}) 