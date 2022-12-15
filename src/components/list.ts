import generateInputBar from './inputBar';
import styles from './list.module.css';
import generateListElement from './listEntry';

interface ListComponentParams {
  newElementCallback: (newElement: string) => void
  initialElements?: string[]
}

export default function generateListComponent({
  newElementCallback,
  initialElements = [],
}: ListComponentParams) {
  let updateList: (listElements: string[]) => void;
  const listElements = initialElements;

  const newListComponent = document.createElement<'div'>('div');
  newListComponent.classList.add(styles.mainContainer);

  const inputBar = generateInputBar({
    newElementCallback: (newElement: string) => {
      listElements.push(newElement);
      if (updateList) updateList(listElements);

      newElementCallback(newElement);
    },
  });
  newListComponent.appendChild(inputBar);

  const listContainer = document.createElement<'ul'>('ul');
  listContainer.classList.add(styles.listContainer);
  newListComponent.appendChild(listContainer);

  updateList = (listEntries: string[]) => {
    listContainer.textContent = '';
    listEntries.forEach((element, index) => {
      listContainer.appendChild(generateListElement({
        label: element,
        onDelete: () => {
          listEntries.splice(index, 1);
          updateList(listEntries);
        },
      }));
    });
  };
  updateList(initialElements);

  return newListComponent;
}
