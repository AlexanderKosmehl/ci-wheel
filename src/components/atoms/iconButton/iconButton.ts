import generateButton from '../button/button';
import styles from './iconButton.module.css';

interface IconButtonParams {
  iconURL: string;
  onClick?: () => void;
  classes?: string[];
  testSelector?: string,
}

export default function generateIconButton({
  iconURL,
  onClick = () => {},
  classes = [],
  testSelector,
}: IconButtonParams) {
  const deleteIcon = document.createElement<'img'>('img');
  deleteIcon.classList.add(styles.icon);
  deleteIcon.src = iconURL;

  return generateButton({
    content: deleteIcon,
    classes: [styles.button, ...classes],
    onClick,
    testSelector,
  });
}
