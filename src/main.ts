import './style.css';

let degree = 0;

document.querySelector('#spin-button')?.addEventListener('click', () => {
  const spinner = document.querySelector('.wheel-container') as HTMLDivElement;
  if (!spinner) return;

  spinner.style.transform = `rotate(${degree}deg)`;
  degree += Math.random() * 1000;
});
