import generateIconButton from './iconButton';
import plusIcon from '../../../icons/+-icon.svg';

export default {
  title: 'Atoms/IconButton',
};

export const Default = () => generateIconButton({
  iconURL: plusIcon,
  onClick: () => {},
});
