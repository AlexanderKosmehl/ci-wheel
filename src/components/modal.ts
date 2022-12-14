import styles from './modal.module.css';

function generateModalContent(
  closeButtonCallback: () => void,
  removeButtonCallback: () => void,
) {
  const modalContent = document.createElement<'div'>('div');
  modalContent.classList.add(styles.content);

  const header = document.createElement<'div'>('div');
  header.classList.add(styles.header);

  const headerText = document.createElement<'h2'>('h2');
  headerText.classList.add(styles.headerText);
  headerText.textContent = 'Ergebnis:';
  header.appendChild(headerText);

  const closeButton = document.createElement<'button'>('button');
  closeButton.classList.add(styles.closeButton);
  closeButton.textContent = 'Schließen';
  closeButton.onclick = closeButtonCallback;
  header.appendChild(closeButton);
  modalContent.appendChild(header);

  const resultElement = document.createElement<'div'>('div');
  resultElement.classList.add(styles.resultElement);

  const resultLabel = document.createElement<'h3'>('h3');
  resultLabel.classList.add(styles.resultLabel);

  const removeButton = document.createElement<'button'>('button');
  removeButton.classList.add(styles.resultButton);
  removeButton.textContent = 'Entfernen';
  removeButton.onclick = removeButtonCallback;

  resultElement.appendChild(resultLabel);
  resultElement.appendChild(removeButton);
  modalContent.appendChild(resultElement);

  return { modalContent, resultLabel };
}

export default class ModalComponent {
  modalContainer: HTMLDivElement | null;

  resultLabel?: HTMLHeadingElement;

  removeCallback?: () => void;

  constructor() {
    this.modalContainer = document.querySelector<HTMLDivElement>('#spinner-modal');
    this.modalContainer?.classList.add(styles.modal);

    const { modalContent, resultLabel } = generateModalContent(
      () => this.hide(),
      () => this.removeAndHide(),
    );
    this.resultLabel = resultLabel;

    this.modalContainer?.appendChild(modalContent);
  }

  show(label: string, removeCallback: () => void) {
    if (!this.resultLabel || !this.modalContainer) return;

    this.resultLabel.textContent = label;
    this.modalContainer.style.display = 'flex';

    this.removeCallback = removeCallback;
  }

  hide() {
    if (!this.modalContainer) return;

    this.modalContainer.style.display = 'none';
  }

  removeAndHide() {
    if (this.removeCallback) this.removeCallback();

    this.hide();
  }
}
