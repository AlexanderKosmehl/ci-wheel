interface ButtonParams {
  content: HTMLElement | string,
  onClick: () => void,
  classes?: string[]
}

export default function generateButton({ content, onClick, classes = [] }: ButtonParams) {
  const newButton = document.createElement<'button'>('button');
  newButton.classList.add(...classes);
  newButton.onclick = onClick;
  newButton.append(content);

  return newButton;
}
