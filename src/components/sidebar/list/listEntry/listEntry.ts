import styles from './listEntry.module.css';
import generateIconButton from '../../../atoms/iconButton/iconButton';
import deleteIconURL from '../../../../assets/delete-icon.svg';
import { Entry } from '../../../../util/Entry';

interface ListEntryParams {
  entry: Entry;
  onDelete: () => void;
}

export default function generateListEntry({
  entry,
  onDelete,
}: ListEntryParams) {
  const newListElement = document.createElement<'li'>('li');
  newListElement.classList.add(styles.container);

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.label);
  if (entry.isDone) elementLabel.classList.add(styles.isDone);
  elementLabel.textContent = entry.name;

  newListElement.appendChild(elementLabel);

  const deleteButton = generateIconButton({
    iconURL: deleteIconURL,
    onClick: onDelete,
    classes: [styles.deleteButton],
    testSelector: 'listEntryDeleteButton',
  });
  newListElement.appendChild(deleteButton);

  return newListElement;
}
