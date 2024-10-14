$(function() {

    // Get DOM elements
      const tasksContainer = $('#tasks');
      const headlineInput = $('#headline');
      const newTaskInput = $('#nametask');
      const dateInput = $('#date');
      const pushButton = $('#push');      
    // Initialize tasks from local storage
      let tasks = [];
  

    // Define the Task class
      class Task {
      constructor(headline, name, date) {
        this.headline = headline;
        this.name = name;
        this.date = date;
      }
  
      createElement() {
        const taskElement = $('<div>').addClass('task-item');
  
        const headlineElement = $('<h3>').text(this.headline);
        taskElement.append(headlineElement);
  
        const nameElement = $('<p>').text(this.name);
        taskElement.append(nameElement);
  
        const dateElement = $('<p>').text(`Due Date: ${this.date}`);
        taskElement.append(dateElement);
  
        const removeButton = $('<button>').text('Remove').click(() => {
          console.log('before task reemove');
          taskElement.remove();
          console.log('befoer set item');
          //tasks.splice(tasks.indexOf(this), 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          console.log('after set item');
        
        });
  
        taskElement.append(removeButton);
  
        return taskElement;
      }
    }
  
 
  
   
    if (localStorage.getItem('tasks') !== null) {
      const tasksJSON = localStorage.getItem('tasks');
      tasks = JSON.parse(tasksJSON).map(taskData => new Task(taskData.headline, taskData.name, taskData.date));
  
      tasks.forEach(task => {
        tasksContainer.append(task.createElement());
      });
    }
  
    // Add event listener for the push button
    pushButton.click(() => {    

    // Get task details from input fields
      let taskHeadline = headlineInput.val();
      let taskName = newTaskInput.val();
      let taskDate = dateInput.val();
  
    // Validate the task name
      if (taskName.length === 0) {
        alert('Enter Your Task');
        return;
      }
  
    // Create a task object
     const task = new Task(taskHeadline, taskName, taskDate);
  
    // Add the new task to the tasks array
      tasks.push(task);

      // Create and append a task element to the container
      const taskElement = task.createElement();
      tasksContainer.append(taskElement);
  
      // Clear the input fields
      headlineInput.val('');
      newTaskInput.val('');
      dateInput.val('');

    });

 });
  
  
  