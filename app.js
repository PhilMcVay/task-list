// UI Elements
const form = document.querySelector('form')
const task = document.querySelector('#task')
const taskList = document.querySelector('.task-list')
const addBtn = document.querySelector('#add-btn')
const filter = document.querySelector('#filter')
const clearBtn = document.querySelector('#clear-btn')
const removeTaskBtn = document.querySelector('.remove-task')

// Captures the task input by the user
const taskInput = (e) => {
  // Prevent form submitting
  e.preventDefault()
  // Alert user to enter a task if input field is blank on submit
  if (task.value === '') {
    alert('Add a task')
  } else {
    // Create the list item and the remove button
    const taskToAdd = document.createElement('li')
    const removeButton = document.createElement('a')
    // Add the classes and attributes to the list item and remove button
    taskToAdd.classList.add('list-group-item', 'justify-content-between', 'align-items-center')
    removeButton.classList.add('fas', 'fa-times', 'remove-task')
    removeButton.href = '#'
    // Add the task text to list item
    taskToAdd.appendChild(document.createTextNode(task.value))
    // Add remove button to list item
    taskToAdd.appendChild(removeButton)
    // Append new task to the task list
    taskList.appendChild(taskToAdd)
    // Clear the input field
    task.value = ''
  }
}

// Removes a task
const removeTask = (e) => {
  // Gets the task that was clicked and removes it
  if (e.target.classList.contains('remove-task')) {
    const taskToRemove = e.target.parentElement
    taskToRemove.remove()
  }
}

// Clears the task list
const clearList = () => {
  // Loops through task list and removes each task until the list is blank
  while (taskList.hasChildNodes()) {
    taskList.removeChild(taskList.lastChild);
  }
}

// Filters tasks
const filterTasks = () => {
  // access the current tasks in the list
  const taskItems = document.querySelectorAll('.task-list li')

  // Loop through tasks and hide the ones that do not include the filter input
  taskItems.forEach(task => {
    const filterInput = filter.value.toLowerCase().trim()
    !task.textContent.toLowerCase().includes(filterInput) && filter.value !== ''
      ? task.style.display = 'none'
      : task.style.display = 'flex'
  })
}

// Event Listeners
form.addEventListener('submit', taskInput)
addBtn.addEventListener('click', taskInput)
clearBtn.addEventListener('click', clearList)
filter.addEventListener('input', filterTasks)
taskList.addEventListener('click', removeTask)