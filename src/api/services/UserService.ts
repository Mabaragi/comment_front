/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomUser } from '../models/CustomUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Retrieve a list of users
     * @returns CustomUser
     * @throws ApiError
     */
    public static userList(): CancelablePromise<Array<CustomUser>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/',
        });
    }
}
