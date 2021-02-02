const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


//load all event listeners
loadEventListeners();

function loadEventListeners(){
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);

}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  // Create a new link element
  const link = document.createElement('a');
  // Add class to the link
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  })

}




function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a new link element
  const link = document.createElement('a');
  // Add class to the link
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in Ls
  storeTaskInLocalStorage(taskInput.value);


 //Clear input
 taskInput.value = '';

  e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}





//Remove Task

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  console.log(taskItem);
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
  // taskList.innerHTML = '';

  //This way does faster then above
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
     const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }else{
        task.style.display = 'none';
      }
    }
  );
}