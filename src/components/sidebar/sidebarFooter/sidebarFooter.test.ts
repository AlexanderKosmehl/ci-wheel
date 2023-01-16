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

  const importButton = footer.querySelector<HTMLButtonElement>('[data-test=sidebarImportButton]');
  const archiveButton = footer.querySelector<HTMLButtonElement>('[data-test=sidebarArchiveButton]');

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
