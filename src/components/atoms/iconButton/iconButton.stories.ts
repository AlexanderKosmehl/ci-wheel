import generateIconButton from './iconButton';
import plusIcon from '../../../assets/plus-icon.svg';

export default {
  title: 'Atoms/IconButton',
};

export const Default = () => generateIconButton({
  iconURL: plusIcon,
  onClick: () => {},
});
