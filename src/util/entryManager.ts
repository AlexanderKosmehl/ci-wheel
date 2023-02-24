import { getArchiveEntries, updateArchiveEntries } from '../components/modal/archiveModal/helper/archiveHelper';
import { Entry } from './Entry';
import { EntryEvents } from './EntryEvents';
import { getSearchParams, updateSearchParams } from './searchParamHelper';

let entries: Entry[] = [];

function dispatchUpdate() {
  window.dispatchEvent(
    new CustomEvent<Entry[]>(EntryEvents.UPDATE, { detail: entries }),
  );
}

export function initEntryManager() {
  entries = getSearchParams().map((initialValue) => ({
    name: initialValue,
    isDone: false,
  }));
  dispatchUpdate();
}

export function toggleIsDone(entryName: string) {
  entries = entries.map((entry) => {
    if (entry.name === entryName) return { name: entry.name, isDone: !entry.isDone };

    return entry;
  });

  dispatchUpdate();
}

export function getCurrentEntries() {
  return [...entries];
}

export function addEntry(newEntryName: string) {
  entries = [{ name: newEntryName, isDone: false }, ...entries];

  updateSearchParams(entries.map((entry) => entry.name));

  dispatchUpdate();
}

export function addEntries(newEntryNames: string[]) {
  entries = [
    ...newEntryNames.map((entryName) => ({ name: entryName, isDone: false })),
    ...entries,
  ];

  updateSearchParams(entries.map((entry) => entry.name));

  dispatchUpdate();
}

export function removeEntry(removedEntryName: string) {
  entries = entries.filter((entry) => entry.name !== removedEntryName);

  updateSearchParams(entries.map((entry) => entry.name));

  const archivedEntries = getArchiveEntries();
  updateArchiveEntries([removedEntryName, ...archivedEntries]);

  dispatchUpdate();
}

export function updateCurrentEntries(updatedEntryList: string[]) {
  entries = updatedEntryList.map((entryName) => ({ name: entryName, isDone: false }));

  updateSearchParams(entries.map((entry) => entry.name));

  dispatchUpdate();
}
