import generateIconButton from '../../atoms/iconButton/iconButton';
import styles from './inputBar.module.css';
import texts from './inputBar.text';
import generateTextInput from '../../atoms/textInput/textInput';
import addIcon from '../../../assets/add-icon.svg';
import { addEntry } from '../../../util/entryManager';

export default function generateInputBar() {
  const newInputBar = document.createElement<'div'>('div');
  newInputBar.classList.add(styles.container);

  let addButton: HTMLButtonElement;
  let inputField: HTMLInputElement;

  function addItem() {
    if (!inputField || inputField.value === '') return;

    addEntry(inputField.value);
    inputField.value = '';

    if (!addButton) return;
    addButton.disabled = true;

    // Reselect input after sidebar rerender
    document.querySelector('input')?.focus();
  }

  inputField = generateTextInput({
    placeholder: texts.inputPlaceholder,
    onKeyPress: (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        addItem();
      }

      if (!addButton) return;
      addButton.disabled = inputField.value === '';
    },
  });
  inputField.dataset.test = 'sidebarInput';
  newInputBar.appendChild(inputField);

  addButton = generateIconButton({
    iconURL: addIcon,
    onClick: addItem,
    classes: [styles.addButton],
    testSelector: 'sidebarInputButton',
  });
  addButton.disabled = true;
  newInputBar.appendChild(addButton);

  return newInputBar;
}
