import generateInputBar from './inputBar';

export default {
  title: 'Sidebar/InputBar',
};

export const Default = () => generateInputBar({
  newEntryCallback: () => {},
});
