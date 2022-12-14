const urlSearchParams = new URLSearchParams(window.location.search);

export function updateSearchParams(entries: string[]) {
  urlSearchParams.set('entries', entries.join(','));
  window.history.replaceState({}, '', `${window.location.pathname}?${urlSearchParams}`);
}

export function getSearchParams() {
  return urlSearchParams.get('entries')?.split(',');
}
