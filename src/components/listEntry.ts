import generateDeleteButton from './deleteButton';
import styles from './listEntry.module.css';

interface ListElementParams {
  label: string,
  onDelete: () => void,
}

export default function generateListElement({ label, onDelete }: ListElementParams) {
  const newListElement = document.createElement<'li'>('li');
  newListElement.classList.add(styles.container);

  const elementLabel = document.createElement<'span'>('span');
  elementLabel.classList.add(styles.label);
  elementLabel.textContent = label;
  newListElement.appendChild(elementLabel);

  const deleteButton = generateDeleteButton({ onClick: onDelete, classes: [styles.deleteButton] });
  newListElement.appendChild(deleteButton);

  return newListElement;
}
