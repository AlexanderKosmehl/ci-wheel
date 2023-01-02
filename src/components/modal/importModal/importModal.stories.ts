import generateImportModal from './importModal';

export default {
  title: 'Modal/ImportModal',
};

export const Default = () => generateImportModal({
  onClose: () => {},
  onImport: () => {},
});
