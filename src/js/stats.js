import { getSavedData, saveData } from './storage.js';
import { refs } from './refs.js';

export const updateStats = () => {
  const data = getSavedData();

  if (!data.length) {
    refs.statsContainer.textContent = '0/0 tasks completed';
  } else {
    const totalTasks = data.reduce((sum, list) => sum + list.tasks.length, 0);
    const completedTaks = data.reduce(
      (sum, list) => sum + list.tasks.filter(t => t.completed).length,
      0
    );
    refs.statsContainer.textContent = `${
      completedTaks || '0'
    }/${totalTasks} tasks completed`;
  }
};
