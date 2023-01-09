const archiveKey = 'ARCHIVE';

export function getArchiveEntries(): string[] {
  const storedString = window.localStorage.getItem(archiveKey);
  const parsedEntries = storedString
    ? JSON.parse(storedString)
    : [];
  return parsedEntries;
}

export function updateArchiveEntries(currentEntries: string[]) {
  window.localStorage.setItem(archiveKey, JSON.stringify(currentEntries));
}
