import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateImportModal from './importModal';

describe('generateImportModal', () => {
  const onClose = jest.fn(() => {});
  const onImport = jest.fn((_importText: string) => {});

  const importModal = generateImportModal({
    onClose,
    onImport,
  });

  const closeButton = importModal.querySelector<HTMLButtonElement>('.closeIcon');

  const textArea = importModal.querySelector<HTMLTextAreaElement>('textarea');
  const importButton = importModal.querySelector<HTMLButtonElement>('.importButton');

  it('generates component correctly', () => {
    expect(importModal).toMatchSnapshot();
  });

  it('adds working onClose callback', () => {
    if (!closeButton) throw Error('No closeButton rendered!');

    closeButton.click();
    expect(onClose).toBeCalled();
  });

  it('adds working onImport callback', () => {
    if (!textArea || !importButton) throw Error('No textarea or importButton rendered!');

    const testvalue = 'Test';

    textArea.value = testvalue;
    importButton.click();

    expect(onImport).toBeCalled();
    expect(onImport).toBeCalledWith(testvalue);
  });
});
