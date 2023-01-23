import generateListEntry from './listEntry';

export default {
  title: 'Sidebar/ListEntry',
};

export const Default = () => generateListEntry({
  label: 'Example',
  isDone: false,
  onDelete: () => {},
});

export const Done = () => generateListEntry({
  label: 'Example',
  isDone: true,
  onDelete: () => {},
});
