import generateModal from './modalBase';

export default {
  title: 'Modal/ModalBase',
};

export const Default = () => generateModal({
  title: 'Title',
  content: document.createElement<'div'>('div'),
  onClose: () => {},
});
