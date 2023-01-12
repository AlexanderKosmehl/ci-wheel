import { Sortable } from '@shopify/draggable';
import generateModal from '../modalBase/modalBase';
import { getArchiveEntries, updateArchiveEntries } from './helper/archiveHelper';
import styles from './archiveModal.module.css';
import texts from './archiveModal.text';

import deleteIcon from '../../../assets/delete-icon.svg';
import './archiveModal.css';

interface ArchiveModalProps {
  onClose: () => void
  currentEntries: string[]
  updateCurrentEntries: (newEntries: string[]) => void
}

const dragClass = 'is-draggable';

export default function generateArchiveModal({
  onClose,
  currentEntries,
  updateCurrentEntries,
}: ArchiveModalProps) {
  const archiveModalContainer = document.createElement<'div'>('div');
  archiveModalContainer.classList.add(styles.archiveModalContainer);

  const currentColumn = document.createElement<'div'>('div');
  currentColumn.classList.add(styles.column);
  const currentHeader = document.createElement<'h3'>('h3');
  currentHeader.classList.add(styles.header);
  currentHeader.textContent = texts.currentTitle;
  const currentListContainer = document.createElement<'ul'>('ul');
  currentListContainer.classList.add(styles.listContainer);

  currentColumn.appendChild(currentHeader);
  currentColumn.appendChild(currentListContainer);
  archiveModalContainer.appendChild(currentColumn);

  const archiveColumn = document.createElement<'div'>('div');
  archiveColumn.classList.add(styles.column);
  const archiveHeader = document.createElement<'h3'>('h3');
  archiveHeader.classList.add(styles.header);
  archiveHeader.textContent = texts.archiveTitle;
  const archiveListContainer = document.createElement<'ul'>('ul');
  archiveListContainer.classList.add(styles.listContainer);

  archiveColumn.appendChild(archiveHeader);
  archiveColumn.appendChild(archiveListContainer);
  archiveModalContainer.appendChild(archiveColumn);

  const removalContainer = document.createElement<'div'>('div');
  removalContainer.classList.add(styles.removalContainer);
  archiveModalContainer.appendChild(removalContainer);
  const removalImage = document.createElement<'img'>('img');
  removalImage.classList.add(styles.removalImage);
  removalImage.src = deleteIcon;

  removalContainer.appendChild(removalImage);

  let currentEntryList = [...currentEntries];

  currentEntryList.forEach((entry) => {
    const newEntryElement = document.createElement<'li'>('li');
    newEntryElement.classList.add(styles.entry, dragClass);
    newEntryElement.textContent = entry;

    currentListContainer.appendChild(newEntryElement);
  });

  let archivedEntryList = getArchiveEntries()
    .filter((archivedEntry) => !currentEntryList.includes(archivedEntry));

  archivedEntryList.forEach((entry) => {
    const newEntryElement = document.createElement<'li'>('li');
    newEntryElement.classList.add(styles.entry, dragClass);
    newEntryElement.textContent = entry;

    archiveListContainer.appendChild(newEntryElement);
  });

  const sortable = new Sortable([currentListContainer, archiveListContainer, removalContainer], {
    draggable: `.${dragClass}`,
  });

  sortable.on('sortable:stop', (event) => {
    if (event.oldContainer === event.newContainer) return;

    const changedElement = event.dragEvent.source.textContent;
    if (!changedElement) return;

    if (event.newContainer === currentListContainer) {
      // From archive to current
      currentEntryList = [changedElement, ...currentEntryList];
      archivedEntryList = archivedEntryList.filter((entry) => entry !== changedElement);
    } else if (event.newContainer === archiveListContainer) {
      // From current to archive
      currentEntryList = currentEntryList.filter((entry) => entry !== changedElement);
      archivedEntryList = [changedElement, ...archivedEntryList];
    } else if (event.newContainer === removalContainer) {
      // From any to removal
      currentEntryList = currentEntryList.filter((entry) => entry !== changedElement);
      archivedEntryList = archivedEntryList.filter((entry) => entry !== changedElement);
      event.newContainer.removeChild(event.dragEvent.source);
    }
    updateCurrentEntries(currentEntryList);
    updateArchiveEntries(archivedEntryList);
  });

  const modal = generateModal({
    title: texts.title,
    onClose,
    content: archiveModalContainer,
  });

  return modal;
}
