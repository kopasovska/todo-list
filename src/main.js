import { refs } from './js/refs.js';
import { updateStats } from './js/stats.js';
import { deleteList, addNewList } from './js/lists.js';
import {
  addNewTask,
  deleteTask,
  toggleTaskStatus,
  resetAllTasks,
} from './js/tasks.js';
import renderCards from './js/render.js';

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

/* Start App */

const startApp = () => {
  updateStats();
  renderCards();
};

startApp();
