import generateWheel from './components/wheel';
import './style.css';

const wheelContainer = document.querySelector<HTMLDivElement>('#wheel-container');
const listElement = document.querySelector<HTMLUListElement>('#list');
const listInput = document.querySelector<HTMLInputElement>('#list-input');
const inputButton = document.querySelector<HTMLButtonElement>('#list-input-button');
const spinButton = document.querySelector<HTMLButtonElement>('#spin-button');

let degree = 0;
const listEntries: string[] = [];

function renderWheel(labels: string[]) {
  if (!wheelContainer || !labels) return;

  wheelContainer.textContent = '';
  wheelContainer.appendChild(generateWheel(labels));

  degree = 0;
}

spinButton?.addEventListener('click', () => {
  const spinner = document.querySelector('.wheel') as HTMLDivElement;
  if (!spinner) return;

  degree += 720 + Math.random() * 360;
  spinner.style.transform = `rotate(${degree}deg)`;
});

function renderList(labels: string[]) {
  if (!listElement) return;

  listElement.textContent = '';

  labels.forEach((label) => {
    const newListEntry = document.createElement<'li'>('li');
    newListEntry.textContent = label;
    listElement.appendChild(newListEntry);
  });
}

function handleInput() {
  if (!listInput) return;

  listEntries.push(listInput.value);
  listInput.value = '';

  renderList(listEntries);
  renderWheel(listEntries);
}

listInput?.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key !== 'Enter') return;

  handleInput();
});
inputButton?.addEventListener('click', handleInput);
