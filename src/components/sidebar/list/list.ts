import generateListEntry from './listEntry/listEntry';
import styles from './list.module.css';

interface ListComponentParams {
  entryRemovalCallback: (removedElement: string) => void;
  listEntries: string[];
}

export default function generateList({
  entryRemovalCallback,
  listEntries,
}: ListComponentParams) {
  const listContainer = document.createElement<'ul'>('ul');
  listContainer.classList.add(styles.listContainer);

  listEntries.forEach((element) => {
    listContainer.appendChild(
      generateListEntry({
        label: element,
        onDelete: () => {
          entryRemovalCallback(element);
        },
      }),
    );
  });

  return listContainer;
}
