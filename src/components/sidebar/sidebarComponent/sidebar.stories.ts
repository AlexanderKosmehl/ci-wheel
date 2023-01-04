import generateSidebar from './sidebar';

export default {
  title: 'Sidebar/Sidebar',
};

export const Default = () => {
  const { sidebar } = generateSidebar({
    listEntries: ['Example 1', 'Example 2'],
    listChangeCallback: () => {},
    importOnClick: () => {},
    archiveOnClick: () => {},
  });
  return sidebar;
};
