import generateListEntry from './listEntry/listEntry';
import styles from './list.module.css';
import { Entry } from '../../../util/Entry';
import { EntryEvents } from '../../../util/EntryEvents';

export default function generateList() {
  const listContainer = document.createElement<'ul'>('ul');
  listContainer.classList.add(styles.listContainer);

  const updateList = (listEntries: Entry[]) => {
    listContainer.textContent = '';

    listEntries.forEach((entry) => {
      listContainer.appendChild(
        generateListEntry({
          label: entry.name,
          isDone: entry.isDone,
        }),
      );
    });
  };

  window.addEventListener(EntryEvents.UPDATE, ((event: CustomEvent<Entry[]>) => {
    updateList(event.detail);
  }) as EventListener);

  return listContainer;
}
