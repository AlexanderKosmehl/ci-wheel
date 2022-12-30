import styles from './listEntry.module.css';
import generateIconButton from '../../../atoms/iconButton/iconButton';
import deleteIconURL from '../../../../icons/trash-icon.svg';

interface ListEntryParams {
  label: string,
  onDelete: () => void,
}

export default function generateListEntry({ label, onDelete }: ListEntryParams) {
  const newListElement = document.createElement<'li'>('li');
  newListElement.classList.add(styles.container);

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.label);
  elementLabel.textContent = label;
  newListElement.appendChild(elementLabel);

  const deleteButton = generateIconButton({
    iconURL: deleteIconURL,
    onClick: onDelete,
    classes: [styles.deleteButton],
  });
  newListElement.appendChild(deleteButton);

  return newListElement;
}
