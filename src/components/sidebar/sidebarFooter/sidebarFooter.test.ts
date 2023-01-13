import {
  describe, expect, it, vi,
} from 'vitest';
import generateSidebarFooter from './sidebarFooter';

describe('generateSidebarFooter', () => {
  const onImportClick = vi.fn(() => {});
  const onArchiveClick = vi.fn(() => {});

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
