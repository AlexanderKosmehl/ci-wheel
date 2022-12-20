import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateButton from './button';

describe('generateButton', () => {
  const onClick = jest.fn(() => {});

  const button = generateButton({
    content: 'Text',
    classes: ['class', 'class2'],
    onClick,
  });

  it('generates a button component', () => {
    expect(button).toMatchSnapshot();
  });

  it('adds working clickListener', () => {
    button.click();
    expect(onClick).toBeCalled();
  });
});
