/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * API Documentation
 * API for my project
 * OpenAPI spec version: v1
 */

export interface CommentEmotionAnalysis {
  readonly id?: number;
  /** @minLength 1 */
  readonly content?: string;
  /** @minLength 1 */
  readonly sentiment?: string;
  readonly created_at?: string;
  comment: number;
}
