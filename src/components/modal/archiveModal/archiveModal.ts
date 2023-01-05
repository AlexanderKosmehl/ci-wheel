import interact from 'interactjs';
import generateModal from '../modalBase/modalBase';
import styles from './archiveModal.module.css';
import texts from './archiveModal.text';

interface ArchiveModalProps {
  onClose: () => void
}

export default function generateArchiveModal({ onClose }: ArchiveModalProps) {
  const archiveModalContainer = document.createElement<'div'>('div');
  archiveModalContainer.classList.add(styles.archiveModalContainer);

  const currentColumn = document.createElement<'div'>('div');
  currentColumn.classList.add(styles.column);
  const currentHeader = document.createElement<'h2'>('h2');
  currentHeader.classList.add(styles.header);
  currentHeader.textContent = 'Aktuell';
  const currentListContainer = document.createElement<'div'>('div');
  currentListContainer.classList.add(styles.listContainer);

  currentColumn.appendChild(currentHeader);
  currentColumn.appendChild(currentListContainer);

  interact(currentListContainer).dropzone({});
  archiveModalContainer.appendChild(currentColumn);

  const archiveColumn = document.createElement<'div'>('div');
  archiveColumn.classList.add(styles.column);
  const archiveHeader = document.createElement<'h2'>('h2');
  archiveHeader.classList.add(styles.header);
  archiveHeader.textContent = 'Alt';
  const archiveListContainer = document.createElement<'div'>('div');
  archiveListContainer.classList.add(styles.listContainer);

  const testEntry = document.createElement<'div'>('div');
  testEntry.classList.add(styles.entry);
  testEntry.textContent = 'Drag';

  archiveListContainer.appendChild(testEntry);
  interact(archiveListContainer).dropzone({});

  const position = { x: 0, y: 0 };
  interact(testEntry).draggable({
    origin: archiveModalContainer,
    listeners: {
      start(event) {
        console.log(event);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        // eslint-disable-next-line no-param-reassign
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
      end(event) {
        console.log(event);

        // eslint-disable-next-line no-param-reassign
        event.target.style.transform = '';

        if (!event.relatedTarget) return;

        event.relatedTarget.appendChild(testEntry);
        position.x = 0;
        position.y = 0;
      },
    },
  });

  archiveColumn.appendChild(archiveHeader);
  archiveColumn.appendChild(archiveListContainer);
  archiveModalContainer.appendChild(archiveColumn);

  const modal = generateModal({
    title: texts.title,
    onClose,
    content: archiveModalContainer,
  });

  return modal;
}
