import { updateSearchParams } from '../util/searchParamHelper';
import generateInputBar from './inputBar';
import styles from './list.module.css';
import generateListElement from './listEntry';

interface ListComponentParams {
  listChangeCallback: (updatedList: string[]) => void
  initialElements?: string[]
}

export default function generateListComponent({
  listChangeCallback,
  initialElements = [],
}: ListComponentParams) {
  const listElements = [...initialElements];

  const newListComponent = document.createElement<'div'>('div');
  newListComponent.classList.add(styles.mainContainer);

  const listContainer = document.createElement<'ul'>('ul');
  listContainer.classList.add(styles.listContainer);

  function updateList(listEntries: string[]) {
    listContainer.textContent = '';

    updateSearchParams(listEntries);

    listEntries.forEach((element, index) => {
      listContainer.appendChild(generateListElement({
        label: element,
        onDelete: () => {
          listEntries.splice(index, 1);
          updateList(listEntries);
          listChangeCallback([...listEntries]);
        },
      }));
    });
  }
  updateList(initialElements);

  const inputBar = generateInputBar({
    newElementCallback: (newElement: string) => {
      listElements.push(newElement);
      updateList(listElements);

      listChangeCallback([...listElements]);
    },
  });

  newListComponent.appendChild(inputBar);
  newListComponent.appendChild(listContainer);

  return newListComponent;
}
