import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateIconButton from './iconButton';
import addIconUrl from '../../../icons/+-Icon.svg';

describe('iconButton', () => {
  const onClick = jest.fn(() => {});

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
