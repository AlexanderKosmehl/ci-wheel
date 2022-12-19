import generateIconButton from '../iconButton/iconButton';
import styles from './inputBar.module.css';
import generateTextInput from '../textInput/textInput';
import addIcon from '../../../icons/+-icon.svg';

interface InputBarParams {
  newElementCallback: (newElement: string) => void
}

export default function generateInputBar({ newElementCallback }: InputBarParams) {
  const newInputBar = document.createElement<'div'>('div');
  newInputBar.classList.add(styles.container);

  let addButton: HTMLButtonElement;
  let inputField: HTMLInputElement;

  function addItem() {
    if (!inputField || inputField.value === '') return;

    newElementCallback(inputField.value);
    inputField.value = '';

    if (!addButton) return;
    addButton.disabled = true;
  }

  inputField = generateTextInput({
    placeholder: 'Neuer Eintrag',
    onKeyPress: (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        addItem();
      }

      if (!addButton) return;
      addButton.disabled = inputField.value === '';
    },
  });
  newInputBar.appendChild(inputField);

  addButton = generateIconButton({
    iconURL: addIcon,
    onClick: addItem,
    classes: [styles.addButton],
  });
  addButton.disabled = true;
  newInputBar.appendChild(addButton);

  return newInputBar;
}
