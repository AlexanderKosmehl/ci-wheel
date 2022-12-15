import styles from './list.module.css';
import generateListElement from './listEntry';

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
      newListEntry.appendChild(generateListElement({
        label: entry,
        onDelete: () => {
          this.listEntries.splice(entryIndex, 1);

          this.changeHandler();
        },
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
