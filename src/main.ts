import generateWheel from './components/wheel';
import './style.css';

let degree = 0;

const wheelContainer = document.getElementById('wheel-container');
wheelContainer?.appendChild(generateWheel(Object.keys(new Array(16).fill(0))));

document.querySelector('#spin-button')?.addEventListener('click', () => {
  const spinner = document.querySelector('.wheel') as HTMLDivElement;
  if (!spinner) return;

  degree += Math.random() * 1000;
  spinner.style.transform = `rotate(${degree}deg)`;
});
