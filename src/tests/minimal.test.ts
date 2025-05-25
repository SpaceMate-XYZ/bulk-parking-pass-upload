import { describe, it, expect } from 'vitest';

describe('minimal suite', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should also pass', () => {
    expect(true).toBe(true);
  });
});
