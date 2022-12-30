import generateButton from '../../atoms/button/button';
import generateModal from '../modalBase/modalBase';
import styles from './importModal.module.css';
import texts from './importModal.text';

interface ImportModalParams {
  onClose: () => void
  onImport: (importText: string) => void
}

export default function generateImportModal({
  onClose,
  onImport,
}: ImportModalParams) {
  const importModalContainer = document.createElement<'div'>('div');
  importModalContainer.classList.add(styles.importModalContainer);

  const importTextarea = document.createElement<'textarea'>('textarea');
  importTextarea.classList.add(styles.importTextarea);
  importModalContainer.appendChild(importTextarea);

  const buttonWrapper = document.createElement<'div'>('div');
  buttonWrapper.classList.add(styles.importButtonWrapper);

  buttonWrapper.appendChild(generateButton({
    content: texts.button,
    onClick: () => onImport(importTextarea.value),
    classes: [styles.importButton],
  }));
  importModalContainer.appendChild(buttonWrapper);

  const modal = generateModal({
    title: texts.header,
    content: importModalContainer,
    onClose,
  });

  return modal;
}
