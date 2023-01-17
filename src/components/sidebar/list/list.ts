import generateListEntry from './listEntry/listEntry';
import styles from './list.module.css';
import { Entry } from '../../../util/Entry';

interface ListComponentParams {
  entryRemovalCallback: (removedEntry: Entry) => void;
  entries: Entry[];
}

export default function generateList({
  entryRemovalCallback,
  entries,
}: ListComponentParams) {
  const listContainer = document.createElement<'ul'>('ul');
  listContainer.classList.add(styles.listContainer);

  entries.forEach((entry) => {
    listContainer.appendChild(
      generateListEntry({
        entry,
        onDelete: () => {
          entryRemovalCallback(entry);
        },
      }),
    );
  });

  return listContainer;
}
