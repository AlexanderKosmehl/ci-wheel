import generateListEntry from './listEntry';

export default {
  title: 'Sidebar/ListEntry',
};

export const Default = () => generateListEntry({
  label: 'Example',
  onDelete: () => {},
});
