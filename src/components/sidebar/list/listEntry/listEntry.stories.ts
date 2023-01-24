import generateListEntry from './listEntry';

export default {
  title: 'Sidebar/ListEntry',
};

export const Default = () => generateListEntry({
  label: 'Example',
  isDone: false,
});

export const Done = () => generateListEntry({
  label: 'Example',
  isDone: true,
});
