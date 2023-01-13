import { describe, expect, it } from 'vitest';
import generateHeader from './header';

describe('generateHeader', () => {
  const header = generateHeader();

  it('generates component correctly', () => {
    expect(header).toMatchSnapshot();
  });
});
