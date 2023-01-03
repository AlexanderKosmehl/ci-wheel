import generateListComponent from './listComponent';

export default {
  title: 'Sidebar/ListComponent',
};

export const Default = () => generateListComponent({
  listEntries: ['Example 1', 'Example 2'],
  entryRemovalCallback: () => {},
});
