interface ButtonParams {
  content: HTMLElement | string,
  onClick?: () => void;
  classes?: string[];
  testSelector?: string;
}

export default function generateButton({
  content,
  onClick = () => {},
  classes = [],
  testSelector,
}: ButtonParams) {
  const newButton = document.createElement<'button'>('button');
  newButton.classList.add(...classes);
  newButton.onclick = onClick;
  newButton.append(content);

  if (testSelector) newButton.dataset.test = testSelector;

  return newButton;
}
