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

  function updateList() {
    listContainer.textContent = '';

    updateSearchParams(listElements);

    listElements.forEach((element, index) => {
      listContainer.appendChild(generateListElement({
        label: element,
        onDelete: () => {
          listElements.splice(index, 1);
          updateList();
          listChangeCallback([...listElements]);
        },
      }));
    });
  }
  updateList();

  const inputBar = generateInputBar({
    newElementCallback: (newElement: string) => {
      listElements.push(newElement);
      updateList();

      listChangeCallback([...listElements]);
    },
  });

  newListComponent.appendChild(inputBar);
  newListComponent.appendChild(listContainer);

  return newListComponent;
}
