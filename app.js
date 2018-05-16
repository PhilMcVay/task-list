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
    alert('add a task')
  } else {
    // Create the list item and the remove button
    const taskToAdd = document.createElement('li')
    const removeButton = document.createElement('a')
    // Add the classes and attributes to the list item and remove button
    taskToAdd.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
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

// Clears the task list
const clearList = () => {
  while (taskList.hasChildNodes()) {
    taskList.removeChild(taskList.lastChild);
  }
}

// Event Listeners
form.addEventListener('submit', taskInput)
clearBtn.addEventListener('click', clearList)