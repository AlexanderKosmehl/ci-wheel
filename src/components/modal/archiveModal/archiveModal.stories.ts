import generateArchiveModal from './archiveModal';

export default {
  title: 'Modal/ArchiveModal',
};

export const Default = () => generateArchiveModal({
  onClose: () => {},
});
