import styles from './listEntry.module.css';
import generateIconButton from '../../../atoms/iconButton/iconButton';
import deleteIconURL from '../../../../assets/delete-icon.svg';

interface ListEntryParams {
  label: string;
  isDone: boolean;
  onDelete: () => void;
}

export default function generateListEntry({
  label,
  isDone,
  onDelete,
}: ListEntryParams) {
  const newListElement = document.createElement<'li'>('li');
  newListElement.classList.add(styles.container);

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.label);
  if (isDone) elementLabel.classList.add(styles.isDone);
  elementLabel.textContent = label;
  elementLabel.dataset.test = 'listEntryLabel';
  newListElement.appendChild(elementLabel);

  const deleteButton = generateIconButton({
    iconURL: deleteIconURL,
    onClick: onDelete,
    classes: [styles.deleteButton],
    testSelector: 'listEntryDeleteButton',
  });
  newListElement.appendChild(deleteButton);

  if (isDone) newListElement.style.order = '1';

  return newListElement;
}
