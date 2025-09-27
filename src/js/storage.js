export const getSavedData = () => {
  return JSON.parse(localStorage.getItem('todoApp')) || [];
};

export const saveData = data => {
  localStorage.setItem('todoApp', JSON.stringify(data));
};
