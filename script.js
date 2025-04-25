$(document).ready(function () {

    // Load tasks from localStorage on page load
    loadTasks();
  
    // Add Task
    $('#addTaskBtn').click(function () {
      const taskText = $('#taskInput').val().trim();
      if (taskText !== "") {
        const taskId = new Date().getTime(); // Unique task ID
        const task = {
          id: taskId,
          text: taskText
        };
  
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        $('#taskInput').val('');
        loadTasks();
      }
    });
  
    // Edit Task
    $(document).on('click', '.editBtn', function () {
      const taskId = $(this).data('id');
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      const task = tasks.find(t => t.id === taskId);
      const newText = prompt('Edit task:', task.text);
      if (newText !== null) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
      }
    });
  
    // Delete Task
    $(document).on('click', '.deleteBtn', function () {
      const taskId = $(this).data('id');
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks = tasks.filter(t => t.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    });
  
    // Load tasks from localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskList = $('#taskList');
      taskList.empty();
  
      tasks.forEach(task => {
        const taskItem = `
          <li class="list-group-item task-item" data-id="${task.id}">
            <span>${task.text}</span>
            <div>
              <button class="btn btn-warning btn-sm editBtn" data-id="${task.id}">Edit</button>
              <button class="btn btn-danger btn-sm deleteBtn" data-id="${task.id}">Delete</button>
            </div>
          </li>
        `;
        taskList.append(taskItem);
      });
    }
  
  });
  