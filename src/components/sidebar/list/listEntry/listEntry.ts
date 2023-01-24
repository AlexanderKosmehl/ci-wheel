import styles from './listEntry.module.css';
import generateIconButton from '../../../atoms/iconButton/iconButton';
import deleteIconURL from '../../../../assets/delete-icon.svg';
import addIconURL from '../../../../assets/add-icon.svg';
import { removeEntry, toggleIsDone } from '../../../../util/entryManager';

interface ListEntryParams {
  label: string;
  isDone: boolean;
}

export default function generateListEntry({
  label,
  isDone,
}: ListEntryParams) {
  const newListElement = document.createElement<'li'>('li');
  newListElement.classList.add(styles.container);
  if (isDone) newListElement.style.order = '1';

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.label);
  if (isDone) elementLabel.classList.add(styles.isDone);
  elementLabel.textContent = label;
  elementLabel.dataset.test = 'listEntryLabel';
  newListElement.appendChild(elementLabel);

  const buttonWrapper = document.createElement<'div'>('div');
  buttonWrapper.classList.add(styles.buttonWrapper);

  if (isDone) {
    const reAddButton = generateIconButton({
      iconURL: addIconURL,
      onClick: () => toggleIsDone(label),
      classes: [styles.button],
      testSelector: 'listEntryReAddButton',
    });
    buttonWrapper.appendChild(reAddButton);
  }

  const deleteButton = generateIconButton({
    iconURL: deleteIconURL,
    onClick: () => removeEntry(label),
    classes: [styles.button],
    testSelector: 'listEntryDeleteButton',
  });
  buttonWrapper.appendChild(deleteButton);

  newListElement.appendChild(buttonWrapper);

  return newListElement;
}
