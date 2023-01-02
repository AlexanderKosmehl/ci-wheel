import generateSpinResultModal from './spinResultModal';

export default {
  title: 'Modal/SpinResultModal',
};

export const Default = () => generateSpinResultModal({
  label: 'Result Label',
  onClose: () => {},
  onDelete: () => {},
});
