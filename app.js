// UI Elements
const form = document.querySelector('form')
const task = document.querySelector('#task')
const taskList = document.querySelector('.task-list')
const addBtn = document.querySelector('#add-btn')
const filter = document.querySelector('#filter')
const clearBtn = document.querySelector('#clear-btn')
const removeTaskBtn = document.querySelector('.remove-task')

// Load Local Storage
const loadTasksFromLocalStorage = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks'))

  if (tasks === null) return // Prevents function from running if nothing to load from Local Storage

  tasks.map(task => {
    const taskToAdd = document.createElement('li')
    const removeButton = document.createElement('a')

    taskToAdd.classList.add(
      'list-group-item',
      'justify-content-between',
      'align-items-center'
    )
    removeButton.classList.add(
      'fas',
      'fa-times',
      'remove-task'
    )
    removeButton.href = '#'

    taskToAdd.appendChild(document.createTextNode(task))

    taskToAdd.appendChild(removeButton)

    taskList.appendChild(taskToAdd)

    task.value = '' // Clears the input task input field
  })
}

// Load tasks from LocalStorage
loadTasksFromLocalStorage()

// LocalStorage default task data
let taskData = JSON.parse(localStorage.getItem('tasks')) || []

// Captures the task input by the user
const taskInput = (e) => {
  e.preventDefault()

  if (task.value === '') {
    alert('Add a task') // Alert user to enter a task if input field is blank on submit
  } else {
    const taskToAdd = document.createElement('li')
    const removeButton = document.createElement('a')

    taskToAdd.classList.add(
      'list-group-item',
      'justify-content-between',
      'align-items-center'
    )
    removeButton.classList.add(
      'fas',
      'fa-times',
      'remove-task'
    )
    removeButton.href = '#'

    taskToAdd.appendChild(document.createTextNode(task.value))

    taskToAdd.appendChild(removeButton)

    taskList.appendChild(taskToAdd)

    taskData.push(taskToAdd.textContent)

    setTasksToLocalStorage(taskData)

    task.value = '' // Clears the input task input field
  }
}

// Set Local Storage
const setTasksToLocalStorage = (task) => {
  localStorage.setItem('tasks', JSON.stringify(task))
}

// Removes a task
const removeTask = (e) => {
  if (e.target.classList.contains('remove-task')) {
    const taskToRemove = e.target.parentElement
    const index = taskData.indexOf(taskToRemove.textContent)
    taskToRemove.remove()
    taskData.splice(index, 1)
    setTasksToLocalStorage(taskData)
  }
}

// Clears the task list
const clearList = () => {
  while (taskList.hasChildNodes()) {
    taskList.removeChild(taskList.lastChild);
  }
  taskData = []
  setTasksToLocalStorage(taskData)
}

// Filters tasks
const filterTasks = () => {
  const taskItems = document.querySelectorAll('.task-list li')

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