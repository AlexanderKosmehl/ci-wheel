import generateButton from './button';
import styles from './deleteButton.module.css';
import crossIconUrl from '../icons/x-icon.svg';

interface DeleteButtonParams {
  onClick: () => void
  classes: string[]
}

export default function generateDeleteButton({ onClick, classes }: DeleteButtonParams) {
  const deleteIcon = document.createElement<'img'>('img');
  deleteIcon.classList.add(styles.deleteIcon);
  deleteIcon.src = crossIconUrl;

  return generateButton({
    content: deleteIcon,
    classes: [styles.deleteButton, ...classes],
    onClick,
  });
}
