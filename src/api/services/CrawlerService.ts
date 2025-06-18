/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { Episode } from '../models/Episode';
import type { EpisodeCreateResponse } from '../models/EpisodeCreateResponse';
import type { Series } from '../models/Series';
import type { SeriesCreate } from '../models/SeriesCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CrawlerService {
  /**
   * 특정 시리즈의 에피소드를 조회합니다.
   * @param productId
   * @returns Episode
   * @throws ApiError
   */
  public static crawlerEpisodeRead(
    productId: string,
  ): CancelablePromise<Episode> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/crawler/episode/{product_id}/',
      path: {
        product_id: productId,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * 에피소드의 댓글을 조회합니다.
   * @param productId
   * @returns Comment
   * @throws ApiError
   */
  public static crawlerEpisodeCommentList(
    productId: string,
  ): CancelablePromise<Comment> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/crawler/episode/{product_id}/comment',
      path: {
        product_id: productId,
      },
    });
  }
  /**
   * 에피소드의 댓글을 크롤링하여 db에 저장합니다.
   * @param productId
   * @returns EpisodeCreateResponse
   * @throws ApiError
   */
  public static crawlerEpisodeCommentCreate(
    productId: string,
  ): CancelablePromise<EpisodeCreateResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/crawler/episode/{product_id}/comment',
      path: {
        product_id: productId,
      },
    });
  }
  /**
   * Retrieve a list of users
   * @returns Series
   * @throws ApiError
   */
  public static crawlerSeriesList(): CancelablePromise<Array<Series>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/crawler/series/',
    });
  }
  /**
   * Create a series
   * @param data
   * @returns Series
   * @throws ApiError
   */
  public static crawlerSeriesCreate(
    data: SeriesCreate,
  ): CancelablePromise<Series> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/crawler/series/',
      body: data,
    });
  }
  /**
   * Retrieve a series by ID
   * @param seriesId
   * @returns Series
   * @throws ApiError
   */
  public static crawlerSeriesRead(seriesId: string): CancelablePromise<Series> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/crawler/series/{series_id}/',
      path: {
        series_id: seriesId,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }
  /**
   * 에피소드 목록을 조회하는 API 뷰입니다.
   * @param seriesId
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param fields 불러올 필드 이름을 쉼표로 구분하여 지정 (예: id,name,image_src)
   * @returns any
   * @throws ApiError
   */
  public static crawlerSeriesEpisodeList(
    seriesId: string,
    limit?: number,
    offset?: number,
    fields?: string,
  ): CancelablePromise<{
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<Episode>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/crawler/series/{series_id}/episode/',
      path: {
        series_id: seriesId,
      },
      query: {
        limit: limit,
        offset: offset,
        fields: fields,
      },
    });
  }
  /**
   * 에피소드를 크롤링하여 db에 저장합니다.
   * @param seriesId
   * @returns EpisodeCreateResponse
   * @throws ApiError
   */
  public static crawlerSeriesEpisodeCrawlCreate(
    seriesId: string,
  ): CancelablePromise<EpisodeCreateResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/crawler/series/{series_id}/episode/crawl',
      path: {
        series_id: seriesId,
      },
    });
  }
}
