document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' = don't save again
    }

    // Save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list (and optionally to Local Storage)
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Handle remove logic
        removeButton.onclick = function () {
            taskList.removeChild(li);

            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTasks(tasks);
            }
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if not loading
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            saveTasks(tasks);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load stored tasks on page load
    loadTasks();
});
