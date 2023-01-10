import generateModal from '../modalBase/modalBase';
import texts from './spinResultModal.text';
import generateListEntry from '../../sidebar/list/listEntry/listEntry';

interface SpinResultModalParams {
  label: string
  onClose: () => void
  onDelete: () => void
}

export default function generateSpinResultModal({
  label,
  onClose,
  onDelete,
}: SpinResultModalParams) {
  const resultElement = generateListEntry({
    label,
    onDelete,
  });

  const modal = generateModal({
    title: texts.resultHeader,
    content: resultElement,
    onClose,
  });

  return modal;
}
