/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * API Documentation
 * API for my project
 * OpenAPI spec version: v1
 */
import type { Episode } from './episode';

export type CrawlerSeriesEpisodeList200 = {
  count: number;
  /** @nullable */
  next?: string | null;
  /** @nullable */
  previous?: string | null;
  results: Episode[];
};
