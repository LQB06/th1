document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput')
  const addTaskBtn = document.getElementById('addTaskBtn')
  const taskList = document.getElementById('taskList')

  function addTask () {
    const taskText = taskInput.value
    if (taskText === '') return
    const listItem = document.createElement('li')
    listItem.textContent = taskText
    listItem.addEventListener('click', () => {
      listItem.style.textDecoration = 'line-through'
      saveTasks()
    })
    listItem.addEventListener('dblclick', () => {
      taskList.removeChild(listItem)
      saveTasks()
    })
    taskList.appendChild(listItem)
    taskInput.value = ''
    saveTasks()
  }

  addTaskBtn.addEventListener('click', addTask)

  function saveTasks () {
    const tasks = []
    document.querySelectorAll('#taskList li').forEach(li => {
      tasks.push({
        text: li.textContent,
        completed: li.style.textDecoration === 'line-through'
      })
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function loadTasks () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
      const listItem = document.createElement('li')
      listItem.textContent = task.text
      if (task.completed) {
        listItem.style.textDecoration = 'line-through'
      }
      taskList.appendChild(listItem)
      listItem.addEventListener('click', () => {
        listItem.style.textDecoration = 'line-through'
        saveTasks()
      })
      listItem.addEventListener('dblclick', () => {
        taskList.removeChild(listItem)
        saveTasks()
      })
    })
  }

  loadTasks()
})
