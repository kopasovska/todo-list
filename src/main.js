import { refs } from './js/refs.js';
import { updateStats } from './js/stats.js';
import { deleteList, addNewList } from './js/lists.js';
import {
  addNewTask,
  deleteTask,
  toggleTaskStatus,
  resetAllTasks,
  updateTask,
} from './js/tasks.js';
import renderCards from './js/renderCards.js';
import getForecast from './js/weatherAPI.js';
import { checkSavedTheme } from './js/theme.js';
import renderWeatherWidget from './js/renderWeatherWidget.js';

/* Event Listeners */

//add new list
refs.addListForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = refs.listInput.value.trim();
  if (!title) return;
  addNewList(title);
  refs.listInput.value = '';
});

//delete list
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.delete-card-btn')) {
    const cardItem = e.target.closest('.cards-item');
    const id = cardItem.dataset.id;
    deleteList(id);
  }
});

//add new task
refs.cardsContainer.addEventListener('submit', e => {
  const form = e.target.closest('.add-new-task-form');
  if (form) {
    e.preventDefault();

    const input = form.querySelector('.task-input');
    const taskText = input.value.trim();
    if (!taskText) return;
    const cardItem = form.closest('.cards-item');
    const cardId = cardItem.dataset.id;

    addNewTask(cardId, taskText);
    input.value = '';
  }
});

//delete task
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.delete-task-btn')) {
    const task = e.target.closest('.task-item');
    const taskId = task.dataset.id;
    if (!taskId) return;

    const cardItem = task.closest('.cards-item');
    const cardId = cardItem.dataset.id;

    deleteTask(cardId, taskId);
  }
});

//complete task
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.task-check')) {
    const task = e.target.closest('.task-item');
    const taskId = task.dataset.id;
    if (!taskId) return;

    const cardItem = task.closest('.cards-item');
    const cardId = cardItem.dataset.id;

    toggleTaskStatus(cardId, taskId);
  }
});

//reset all tasks
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.reset-all-tasks-btn')) {
    const cardItem = e.target.closest('.cards-item');
    const id = cardItem.dataset.id;
    resetAllTasks(id);
  }
});

//edit task
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.edit-task-btn')) {
    const task = e.target.closest('.task-item');
    const textElement = task.querySelector('.task-text');

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input task-input';
    input.value = textElement.textContent;

    textElement.replaceWith(input);
    input.focus();

    const toolbar = task.querySelector('.task-toolbar');
    toolbar.innerHTML = `<button type="button" class="secondary-btn save-task-btn">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" class="secondary-btn cancel-edit-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>`;

    task.classList.add('editing');
  }
});

//save changes helper
const saveChanges = (taskItem, newText) => {
  const cardItem = taskItem.closest('.cards-item');
  const cardId = cardItem.dataset.id;
  const taskId = taskItem.dataset.id;

  updateTask(cardId, taskId, newText);
};

//save changes by click
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.save-task-btn')) {
    const taskItem = e.target.closest('.task-item');

    const newText = taskItem.querySelector('.task-input').value.trim();
    if (!newText) return;

    saveChanges(taskItem, newText);
  }
});

//save changes by enter
refs.cardsContainer.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList.contains('task-input')) {
    const taskItem = e.target.closest('.task-item');

    const newText = taskItem.querySelector('.task-input').value.trim();
    if (!newText) return;

    saveChanges(taskItem, newText);
  }
});

//cancel changes by click
refs.cardsContainer.addEventListener('click', e => {
  if (e.target.closest('.cancel-edit-btn')) {
    renderCards();
  }
});

//cancel changes by escape
refs.cardsContainer.addEventListener('keydown', e => {
  if (e.key === 'Escape' && e.target.classList.contains('task-input')) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    renderCards();
  }
});

//toggle theme
refs.themeToggleBtn.addEventListener('click', () => {
  refs.root.classList.toggle('dark');

  if (refs.root.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

//toggleweather widget
refs.weatherButton.addEventListener('click', e => {
  e.stopPropagation();
  if (refs.weatherWidget.classList.contains('opened')) {
    refs.weatherWidget.classList.remove('opened');
    refs.faSunIcon.classList.remove('hidden');
    refs.faCloudIcon.classList.remove('opened');
  } else {
    refs.weatherWidget.classList.add('opened');
    refs.faSunIcon.classList.add('hidden');
    refs.faCloudIcon.classList.add('opened');
  }
});

document.addEventListener('click', e => {
  if (!refs.weatherWidget.contains(e.target)) {
    refs.weatherWidget.classList.remove('opened');
  }
});

/* Start App */

const startApp = async () => {
  updateStats();
  getForecast();
  checkSavedTheme();
  renderCards();
  const forecast = await getForecast();
  renderWeatherWidget(forecast);
};

startApp();
