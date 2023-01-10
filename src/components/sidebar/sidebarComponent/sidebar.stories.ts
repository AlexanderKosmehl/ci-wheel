import generateSidebar from './sidebar';

export default {
  title: 'Sidebar/Sidebar',
};

export const Default = () => generateSidebar({
  listEntries: ['Example 1', 'Example 2'],
  listChangeCallback: () => {},
  openImportModal: () => {},
  openArchiveModal: () => {},
});
