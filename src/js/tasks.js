import { saveData, getSavedData } from './storage.js';
import renderCards from './render.js';

export const addNewTask = (listId, taskText) => {
  const data = getSavedData();

  const list = data.find(l => l.id === listId);
  if (!list) return;

  const newTask = {
    id: `task-${Date.now()}`,
    text: taskText,
    completed: false,
  };

  list.tasks.push(newTask);

  saveData(data);
  renderCards();
};

export const deleteTask = (listId, taskId) => {
  const data = getSavedData();

  const list = data.find(l => l.id === listId);
  if (!list) return;

  list.tasks = list.tasks.filter(t => t.id !== taskId);

  saveData(data);
  renderCards();
};

export const toggleTaskStatus = (listId, taskId) => {
  const data = getSavedData();

  const list = data.find(l => l.id === listId);
  if (!list) return;

  const task = list.tasks.find(t => t.id === taskId);
  task.completed = !task.completed;

  if (task.completed) {
    list.tasks = [...list.tasks.filter(t => t.id !== taskId), task];
  } else {
    list.tasks = [task, ...list.tasks.filter(t => t.id !== taskId)];
  }

  saveData(data);
  renderCards();
};

export const resetAllTasks = listId => {
  const data = getSavedData();

  const list = data.find(l => l.id === listId);
  list.tasks.map(t => (t.completed = false));

  saveData(data);
  renderCards();
};

export const updateTask = (listId, taskId, newText) => {
  const data = getSavedData();

  const list = data.find(l => l.id === listId);
  const task = list.tasks.find(t => t.id === taskId);
  task.text = newText;
  saveData(data);
  renderCards();
};
