import generateIconButton from './iconButton';
import plusIcon from '../../../assets/+-icon.svg';

export default {
  title: 'Atoms/IconButton',
};

export const Default = () => generateIconButton({
  iconURL: plusIcon,
  onClick: () => {},
});
