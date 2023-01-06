import interact from 'interactjs';
import generateModal from '../modalBase/modalBase';
import { getArchiveEntries } from './archiveModal.helper';
import styles from './archiveModal.module.css';
import texts from './archiveModal.text';

interface ArchiveModalProps {
  onClose: () => void
  currentEntries: string[]
  updateCurrentEntries: (newEntries: string[]) => void
}

function makeEntryDraggable(entry: HTMLElement, containerRef: HTMLElement) {
  const position = { x: 0, y: 0 };
  interact(entry).draggable({
    origin: containerRef,
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

        event.relatedTarget.appendChild(entry);
        position.x = 0;
        position.y = 0;
      },
    },
  });
}

export default function generateArchiveModal({ onClose, currentEntries }: ArchiveModalProps) {
  const archiveModalContainer = document.createElement<'div'>('div');
  archiveModalContainer.classList.add(styles.archiveModalContainer);

  const currentColumn = document.createElement<'div'>('div');
  currentColumn.classList.add(styles.column);
  const currentHeader = document.createElement<'h2'>('h2');
  currentHeader.classList.add(styles.header);
  currentHeader.textContent = 'Aktuell';
  const currentListContainer = document.createElement<'ul'>('ul');
  currentListContainer.classList.add(styles.listContainer);
  interact(currentListContainer).dropzone({});

  currentColumn.appendChild(currentHeader);
  currentColumn.appendChild(currentListContainer);

  archiveModalContainer.appendChild(currentColumn);

  const archiveColumn = document.createElement<'div'>('div');
  archiveColumn.classList.add(styles.column);
  const archiveHeader = document.createElement<'h2'>('h2');
  archiveHeader.classList.add(styles.header);
  archiveHeader.textContent = 'Alt';
  const archiveListContainer = document.createElement<'ul'>('ul');
  archiveListContainer.classList.add(styles.listContainer);
  interact(archiveListContainer).dropzone({});

  archiveColumn.appendChild(archiveHeader);
  archiveColumn.appendChild(archiveListContainer);
  archiveModalContainer.appendChild(archiveColumn);

  currentEntries.forEach((entry) => {
    const newEntryElement = document.createElement<'li'>('li');
    newEntryElement.classList.add(styles.entry);
    newEntryElement.textContent = entry;

    makeEntryDraggable(newEntryElement, archiveModalContainer);

    currentListContainer.appendChild(newEntryElement);
  });

  const archivedEntries = getArchiveEntries();
  archivedEntries.forEach((entry) => {
    const newEntryElement = document.createElement<'li'>('li');
    newEntryElement.classList.add(styles.entry);
    newEntryElement.textContent = entry;

    makeEntryDraggable(newEntryElement, archiveModalContainer);

    archiveListContainer.appendChild(newEntryElement);
  });

  const modal = generateModal({
    title: texts.title,
    onClose,
    content: archiveModalContainer,
  });

  return modal;
}
