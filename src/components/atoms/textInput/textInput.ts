import styles from './textInput.module.css';

interface TextInputParams {
  placeholder?: string
  classes?: string[]
  onKeyPress?: (event: KeyboardEvent) => void
}

export default function generateTextInput({ placeholder = '', classes = [], onKeyPress }: TextInputParams) {
  const newTextInput = document.createElement<'input'>('input');
  newTextInput.type = 'text';
  newTextInput.classList.add(...classes, styles.input);
  newTextInput.placeholder = placeholder;
  if (onKeyPress) newTextInput.addEventListener('keyup', (event: KeyboardEvent) => onKeyPress(event));

  return newTextInput;
}
