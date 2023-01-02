import generateButton from './button';

export default {
  title: 'Atoms/Button',
};

export const Default = () => generateButton({
  content: 'Button',
  onClick: () => {},
});
