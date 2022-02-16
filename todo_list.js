addTask('Learn to wrap gifts', 1639944400000)
addTask('Buy milk')

document.getElementById('add_task').addEventListener('click', addTaskEvent)

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addTaskEvent()
  }
})

document.getElementById('task_list').addEventListener('click', (event) => {
  const targetIsButton = event.target.nodeName === 'BUTTON'
  console.log(event.target.nodeName)

  if (targetIsButton) {
    event.target.parentElement.remove()
  }
})

function addTask(description, dueTime) {
  const list = document.getElementById('task_list');
  if (typeof dueTime === 'undefined') {
    list.innerHTML += `<li>${description}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`;
  } else {
    const date = new Date(dueTime)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)} ${date.getHours() >= 12 ? 'PM' : 'AM'}`
    list.innerHTML += `<li>${description}<span class="due">due ${formattedDate}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li>`;
  }
}

// Provided by problem set spec
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
  const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
  const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

  if(dueDate && dueTime) { // The user specified both a due date & due time
      //Add the timezone offset to account for the fact that timestamps are specified by UTC
      const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000
      return dueDate + dueTime + timezoneOffset
  } else {
      // if the user did not specify both a due date and due time, return false
      return false
  }
}

function addTaskEvent() {
  const dueTime = dateAndTimeToTimestamp(document.getElementById('duedate_input'), document.getElementById('duetime_input'))
  const description = document.getElementById('task_description_input').value
  addTask(description, dueTime)

  document.getElementById('task_description_input').value = ''
  document.getElementById('duedate_input').value = ''
  document.getElementById('duetime_input').value = ''
}