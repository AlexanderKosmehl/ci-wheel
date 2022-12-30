import generateListEntry from '../listEntry/listEntry';
import styles from './listComponent.module.css';

interface ListComponentParams {
  entryRemovalCallback: (removedElement: string) => void
  listEntries: string[]
}

export default function generateListComponent({
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
