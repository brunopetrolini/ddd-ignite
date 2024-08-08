import { describe, expect, it } from 'vitest';
import { Slug } from './slug';

describe('Slug', () => {
  it('should be able to create a slug from a text', () => {
    const slug = Slug.createFromText('An example of a slug');
    expect(slug.value).toBe('an-example-of-a-slug');
  });
});
