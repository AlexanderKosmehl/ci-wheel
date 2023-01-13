import { describe, expect, it } from 'vitest';
import generateIndexPage from './indexPage';

describe('generateIndexPage', () => {
  const page = generateIndexPage();

  it('generates component correctly', () => {
    expect(page).toMatchSnapshot();
  });
});
