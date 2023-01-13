import {
  describe, expect, it, vi,
} from 'vitest';
import generateIconButton from './iconButton';
import addIconUrl from '../../../assets/+-Icon.svg';

describe('iconButton', () => {
  const onClick = vi.fn(() => {});

  const button = generateIconButton({
    iconURL: addIconUrl,
    classes: ['class', 'class2'],
    onClick,
  });

  it('generates the component', () => {
    expect(button).toMatchSnapshot();
  });

  it('adds working clickListener', () => {
    button.click();
    expect(onClick).toBeCalled();
  });
});
