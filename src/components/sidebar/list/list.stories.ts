import generateList from './list';

export default {
  title: 'Sidebar/ListComponent',
};

export const Default = () => generateList({
  listEntries: ['Example 1', 'Example 2'],
  entryRemovalCallback: () => {},
});
