import generateSidebarFooter from './sidebarFooter';

export default {
  title: 'Sidebar/Footer',
};

export const Default = () => generateSidebarFooter({
  importOnClick: () => {},
  archiveOnClick: () => {},
});
