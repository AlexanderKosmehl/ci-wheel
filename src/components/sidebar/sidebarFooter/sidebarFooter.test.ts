import {
  describe, expect, it, vi,
} from 'vitest';
import generateSidebarFooter from './sidebarFooter';

describe('generateSidebarFooter', () => {
  const footer = generateSidebarFooter();

  it('generates component correctly', () => {
    expect(footer).toMatchSnapshot();
  });
});
