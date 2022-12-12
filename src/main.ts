import generateWheel from './components/wheel';
import './style.css';

const wheelContainer = document.querySelector<HTMLDivElement>('#wheel-container');
const listElement = document.querySelector<HTMLUListElement>('#list');
const listInput = document.querySelector<HTMLInputElement>('#list-input');
const inputButton = document.querySelector<HTMLButtonElement>('#list-input-button');
const spinButton = document.querySelector<HTMLButtonElement>('#spin-button');

let currentAngle = 0;
const listEntries: string[] = [];

function renderWheel(labels: string[]) {
  if (!wheelContainer || !labels) return;

  wheelContainer.textContent = '';
  wheelContainer.appendChild(generateWheel(labels));

  currentAngle = 0;
}

function getElementAtDegree(degree: number) {
  const indexAtDegree = Math.floor(((degree + 90) % 360) / (360 / listEntries.length));
  console.log(listEntries[indexAtDegree]);
}

spinButton?.addEventListener('click', () => {
  const spinner = document.querySelector('.wheel') as HTMLDivElement;
  if (!spinner) return;

  currentAngle += 720 + Math.random() * 360;
  spinner.style.transform = `rotate(${currentAngle}deg)`;

  getElementAtDegree(currentAngle);
});

function renderList(labels: string[]) {
  if (!listElement) return;

  listElement.textContent = '';

  labels.forEach((label, labelIndex) => {
    const newListEntry = document.createElement<'li'>('li');
    newListEntry.textContent = label;
    newListEntry.addEventListener('click', () => {
      listEntries.splice(labelIndex, 1);
      renderList(listEntries);
      renderWheel(listEntries);
    });

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
