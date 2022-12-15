import generateButton from './button';
import styles from './addButton.module.css';

interface AddButtonParams {
  onClick: () => void
}

export default function generateAddButton({ onClick }: AddButtonParams) {
  return generateButton({ content: 'Hinzufügen', onClick, classes: [styles.addButton] });
}
