import { refs } from './refs.js';

export const checkSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    refs.root.classList.add('dark');
  }
};
