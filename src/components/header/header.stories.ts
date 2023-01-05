import generateHeader from './header';

export default {
  title: 'General/Header',
};

export const Default = () => generateHeader({
  onSidebarToggle: () => {},
});
