import {
  describe, expect, it, jest,
} from '@jest/globals';
import generateButton from './button';

describe('generateButton', () => {
  const content = 'Text';
  const classes = ['class', 'class2'];
  const onClick = jest.fn(() => {});

  const button = generateButton({
    content,
    classes,
    onClick,
  });

  it('generates a button component', () => {
    expect(button).toMatchSnapshot();
  });

  it('adds given content', () => {
    expect(button.textContent).toEqual(content);
  });

  it('adds given classes', () => {
    classes.forEach((cssClass) => {
      expect(button.classList).toContain(cssClass);
    });
  });

  it('adds working clickListener', () => {
    expect(onClick.mock.calls.length).toBe(0);
    button.click();
    expect(onClick.mock.calls.length).toBe(1);
  });
});
