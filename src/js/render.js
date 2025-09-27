import { updateStats } from './stats.js';
import { refs } from './refs.js';
import { getSavedData, saveData } from './storage.js';

const renderTask = task => {
  return `
    <li class="task-item" data-id="${task.id}">
      <span class="task-info-wrapper">
        <i class="task-check fa-regular ${
          task.completed ? 'fa-circle-check' : 'fa-circle'
        }"></i>
        <p class="task-text ${task.completed ? 'muted-text' : ''}">${
    task.text
  }</p>
      </span>
      <div class="task-toolbar">
        <button type="button" class="secondary-btn edit-task-btn">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="secondary-btn delete-task-btn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  `;
};

const renderCard = list => {
  const completedCount = list.tasks.filter(t => t.completed).length;

  return `
    <li class="cards-item" data-id="${list.id}">
      <div class="card-header">
        <span class="card-title-wrapper">
          <i class="fa-solid fa-paperclip"></i>
          <p class="card-title">${list.title}</p>
        </span>
        <div class="card-toolbar">
          <div class="card-stats">${completedCount}/${
    list.tasks.length
  } completed</div>
          <button type="button" class="secondary-btn reset-all-tasks-btn">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <button type="button" class="secondary-btn delete-card-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <form class="add-new-task-form">
        <input type="text" name="taskName" placeholder="Add a new task" class="add-new-input task-input" />
        <button type="submit" class="primary-btn add-new-task-btn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </form>
      <ul class="tasks-list">
        ${list.tasks.map(renderTask).join('')}
      </ul>
    </li>
  `;
};

const renderCards = () => {
  const savedData = getSavedData();

  refs.cardsContainer.innerHTML = '';

  if (!savedData.length) {
    refs.cardsContainer.classList.add('invisible');
    refs.noCardsInfo.classList.remove('invisible');
    return;
  }

  refs.cardsContainer.classList.remove('invisible');
  refs.noCardsInfo.classList.add('invisible');

  refs.cardsContainer.innerHTML = savedData.map(renderCard).join('');

  updateStats();
};

export default renderCards;
