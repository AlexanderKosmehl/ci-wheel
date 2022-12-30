import generateModal from '../modalBase/modalBase';
import styles from './archiveModal.module.css';
import texts from './archiveModal.text';

interface ArchiveModalProps {
  onClose: () => void
}

export default function generateArchiveModal({ onClose }: ArchiveModalProps) {
  const archiveModalContainer = document.createElement<'div'>('div');
  archiveModalContainer.classList.add(styles.archiveModalContainer);

  const modal = generateModal({
    title: texts.title,
    onClose,
    content: archiveModalContainer,
  });

  return modal;
}
