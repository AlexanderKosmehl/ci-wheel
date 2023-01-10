import generateArchiveModal from './archiveModal';

export default {
  title: 'Modal/ArchiveModal',
};

export const Default = () => generateArchiveModal({
  currentEntries: ['Example 1', 'Example 2'],
  onClose: () => {},
  updateCurrentEntries: () => {},
});
