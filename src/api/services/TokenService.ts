/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomTokenObtainPair } from '../models/CustomTokenObtainPair';
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
  /**
   * 로그인 후 access/refresh 토큰 반환
   * @param data
   * @returns CustomTokenObtainPair
   * @throws ApiError
   */
  public static tokenCreate(
    data: TokenObtainPair,
  ): CancelablePromise<CustomTokenObtainPair> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/token/',
      body: data,
    });
  }
  /**
   * Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   * @param data
   * @returns TokenRefresh
   * @throws ApiError
   */
  public static tokenRefreshCreate(
    data: TokenRefresh,
  ): CancelablePromise<TokenRefresh> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/token/refresh/',
      body: data,
    });
  }
}
