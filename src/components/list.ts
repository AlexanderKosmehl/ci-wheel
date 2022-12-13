const listElement = document.querySelector<HTMLUListElement>('#list');
const listInput = document.querySelector<HTMLInputElement>('#list-input');
const inputButton = document.querySelector<HTMLButtonElement>('#list-input-button');

export default class ListComponent {
  listEntries: string[];

  changeHandler: () => void;

  urlSearchParams = new URLSearchParams(window.location.search);

  constructor(listEntries: string[], changeHandler: () => void) {
    this.listEntries = listEntries;
    this.changeHandler = changeHandler;

    listInput?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      this.handleInput();
    });
    inputButton?.addEventListener('click', () => this.handleInput);
  }

  renderList() {
    if (!listElement) return;

    listElement.textContent = '';

    this.listEntries.forEach((entry, entryIndex) => {
      const newListEntry = document.createElement<'li'>('li');
      newListEntry.textContent = entry;
      newListEntry.addEventListener('click', () => {
        this.listEntries.splice(entryIndex, 1);

        this.changeHandler();
      });

      listElement.appendChild(newListEntry);
    });
  }

  handleInput() {
    if (!listInput) return;

    this.listEntries.push(listInput.value);
    listInput.value = '';

    this.urlSearchParams.set('entries', this.listEntries.join(','));
    window.history.replaceState({}, '', `${window.location.pathname}?${this.urlSearchParams}`);

    this.changeHandler();
  }
}
