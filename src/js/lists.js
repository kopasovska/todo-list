import { saveData, getSavedData } from './storage.js';
import renderCards from './renderCards.js';

export const addNewList = title => {
  const data = getSavedData();

  const newList = {
    id: `list-${Date.now()}`,
    title: title,
    tasks: [],
  };

  data.push(newList);
  saveData(data);
  renderCards();
};

export const deleteList = id => {
  const savedData = getSavedData();
  const newData = savedData.filter(list => list.id !== id);
  saveData(newData);
  renderCards();
};
