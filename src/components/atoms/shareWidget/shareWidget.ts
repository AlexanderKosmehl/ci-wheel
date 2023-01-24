import shareIconURL from '../../../assets/share-icon.svg';
import { COPY_MESSAGE_DURATION_IN_SEC } from '../../../config';
import styles from './shareWidget.module.css';
import text from './shareWidget.text';

function addURLToClipboard() {
  const shareText = window.location.href;
  navigator.clipboard.writeText(shareText);
}

export default function generateShareWidget() {
  const wrapper = document.createElement<'div'>('div');

  const button = document.createElement<'button'>('button');
  button.classList.add(styles.button);
  button.onclick = () => {
    addURLToClipboard();
    const copyMessage = document.createElement<'span'>('span');
    copyMessage.classList.add(styles.copyMessage);
    copyMessage.style.animationDuration = `${COPY_MESSAGE_DURATION_IN_SEC}s`;

    copyMessage.textContent = text.copy;
    wrapper.appendChild(copyMessage);

    setTimeout(() => {
      wrapper.removeChild(copyMessage);
    }, COPY_MESSAGE_DURATION_IN_SEC * 1000);
  };
  wrapper.appendChild(button);

  const buttonIcon = document.createElement<'img'>('img');
  buttonIcon.classList.add(styles.shareIcon);
  buttonIcon.src = shareIconURL;
  button.appendChild(buttonIcon);

  const buttonText = document.createElement<'span'>('span');
  buttonText.textContent = text.share;
  button.appendChild(buttonText);

  return wrapper;
}
