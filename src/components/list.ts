import styles from './list.module.css';

const listContainer = document.querySelector<HTMLDivElement>('#list-container');
listContainer?.classList.add(styles.listContainer);

const listElement = document.querySelector<HTMLUListElement>('#list');
listElement?.classList.add(styles.list);

const inputBar = document.querySelector<HTMLDivElement>('#input-bar');
inputBar?.classList.add(styles.inputBar);

const listInput = document.querySelector<HTMLInputElement>('#list-input');
listInput?.classList.add(styles.input);

const inputButton = document.querySelector<HTMLButtonElement>('#list-input-button');
inputButton?.classList.add(styles.inputButton);
if (inputButton) inputButton.disabled = true;

function generateListElement(label: string, onClick: () => void) {
  const elementContainer = document.createElement<'div'>('div');
  elementContainer.classList.add(styles.elementContainer);

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.elementLabel);
  elementLabel.textContent = label;
  elementContainer.appendChild(elementLabel);

  const elementDeleteButton = document.createElement<'button'>('button');
  elementDeleteButton.classList.add(styles.elementDeleteButton);
  elementDeleteButton.textContent = 'X';
  elementDeleteButton.onclick = onClick;
  elementContainer.appendChild(elementDeleteButton);

  return elementContainer;
}

export default class ListComponent {
  listEntries: string[];

  changeHandler: () => void;

  constructor(listEntries: string[], changeHandler: () => void) {
    this.listEntries = listEntries;
    this.changeHandler = changeHandler;

    listInput?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      this.handleInput();
    });
    listInput?.addEventListener('keydown', () => {
      if (!inputButton) return;

      inputButton.disabled = listInput.value === '';
    });
    inputButton?.addEventListener('click', () => this.handleInput());
  }

  render() {
    if (!listElement) return;

    listElement.textContent = '';

    this.listEntries.forEach((entry, entryIndex) => {
      const newListEntry = document.createElement<'li'>('li');
      newListEntry.classList.add(styles.listEntry);
      newListEntry.appendChild(generateListElement(entry, () => {
        this.listEntries.splice(entryIndex, 1);

        this.changeHandler();
      }));

      listElement.appendChild(newListEntry);
    });
  }

  handleInput() {
    if (!listInput?.value) return;

    this.listEntries.push(listInput.value);
    listInput.value = '';
    if (inputButton) inputButton.disabled = true;

    this.changeHandler();
  }
}
