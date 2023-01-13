import { describe, expect, it } from 'vitest';
import { getSearchParams, updateSearchParams } from './searchParamHelper';

describe('searchParamHelper', () => {
  it('returns empty array initially', () => {
    expect(getSearchParams()).toEqual([]);
  });

  it('returns stored values after updating them', () => {
    const testValues = ['Test', 'Test2'];

    updateSearchParams(testValues);

    expect(getSearchParams()).toEqual(testValues);
  });
});
