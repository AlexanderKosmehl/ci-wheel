function updateMaxSpinnerDimensions() {
  const root = document.querySelector<HTMLBaseElement>(':root');
  const spinnerContainer = document.querySelector('#spinner-container');
  if (!spinnerContainer || !root) return;

  root.style.setProperty(
    '--max-spinner-dimensions',
    `${Math.min(
      spinnerContainer.getBoundingClientRect().height,
      spinnerContainer.getBoundingClientRect().width,
    )}px`,
  );
}

function debounce(debouncedFunction: () => void, delay = 200) {
  let timer: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => { debouncedFunction(); }, delay);
  };
}

export default function initSpinnerResizer() {
  updateMaxSpinnerDimensions();

  const debouncedUpdate = debounce(() => updateMaxSpinnerDimensions());

  window.addEventListener('resize', debouncedUpdate);
}
