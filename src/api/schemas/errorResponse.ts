/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * API Documentation
 * API for my project
 * OpenAPI spec version: v1
 */

export interface ErrorResponse {
  /**
   * 에러 코드
   * @minLength 1
   */
  error_code: string;
  /**
   * 사용자 친화적인 에러 메시지
   * @minLength 1
   */
  message: string;
  /**
   * 상세 에러 정보
   * @minLength 1
   */
  detail: string;
}
