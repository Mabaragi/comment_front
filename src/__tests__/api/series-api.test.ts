import { describe, it, expect, beforeAll } from 'vitest';
import api from '../../api/index';
import { apiGetSeries } from '../../api/series';

const TEST_TOKEN = import.meta.env.VITE_TEST_TOKEN;
console.log(`Test token: ${TEST_TOKEN}`);
console.log(`Backend URL: ${import.meta.env.VITE_BACKEND_URL}`);

beforeAll(() => {
  api.defaults.headers.common['Authorization'] = TEST_TOKEN;
});

describe('getSeries', () => {
  it('should return series data', async () => {
    const series = await apiGetSeries();
    expect(series).toBeDefined();
    expect(Array.isArray(series)).toBe(true);
    expect(series.length).toBeGreaterThan(0);
  });
});
