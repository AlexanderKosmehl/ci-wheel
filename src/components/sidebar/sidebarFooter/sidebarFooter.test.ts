import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateSidebarFooter from './sidebarFooter';

describe('generateSidebarFooter', () => {
  const onImportClick = jest.fn(() => {});
  const onArchiveClick = jest.fn(() => {});

  const footer = generateSidebarFooter({
    importOnClick: onImportClick,
    archiveOnClick: onArchiveClick,
  });

  const [importButton, archiveButton] = footer.querySelectorAll<HTMLButtonElement>('button');

  it('generates component correctly', () => {
    expect(footer).toMatchSnapshot();
  });

  it('adds working callbacks', () => {
    if (!importButton || !archiveButton) throw Error('No import or archive button rendered!');

    importButton.click();
    expect(onImportClick).toBeCalled();

    archiveButton.click();
    expect(onArchiveClick).toBeCalled();
  });
});
