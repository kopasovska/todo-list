const refs = {
  taskInput: document.querySelector('.task-input'),
  taskContent: document.querySelector('.task-content'),
  taskDate: document.querySelector('.task-date input'),
  taskList: document.querySelector('.task-list'),
};

const getTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
    ? JSON.parse(localStorage.getItem('tasks'))
    : [];
  if (tasks.length) {
    renderTaskList(tasks);
  }
  return tasks;
};

const renderTaskList = tasks => {
  refs.taskList.innerHTML = '';

  const markup = tasks
    .map(
      task => `<li class='task-item'>
        <p class='task-item-date'>${task.taskDate}</p>
        <p class='task-item-content'>${task.taskContent}</p>
      </ li>`
    )
    .join('');

  refs.taskList.insertAdjacentHTML('beforeend', markup);
};

const reset = () => {
  refs.taskContent.textContent = '';
  refs.taskDate.valueAsDate = new Date();
  refs.taskInput.classList.remove('active');
};

const addTask = () => {
  const newTask = {
    taskContent: refs.taskContent.textContent.trim(),
    taskDate: refs.taskDate.value,
  };

  if (!refs.taskContent) return;

  const tasks = getTasks();
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  reset();
  renderTaskList(tasks);
};

refs.taskDate.valueAsDate = new Date();

document.addEventListener('DOMContentLoaded', () => {
  getTasks();
});

refs.taskContent.addEventListener('input', () => {
  if (refs.taskContent.textContent.trim() !== '') {
    refs.taskInput.classList.add('active');
  } else {
    refs.taskInput.classList.remove('active');
  }
});

refs.taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.task-input')) {
    if (refs.taskContent.textContent.trim() !== '') {
      addTask();
    }
  }
});
