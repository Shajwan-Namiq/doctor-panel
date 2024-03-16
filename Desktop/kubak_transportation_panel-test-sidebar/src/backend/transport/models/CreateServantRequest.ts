/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUpload } from './FileUpload';

export type CreateServantRequest = {
    firstName: string;
    lastName: string;
    nationalId: string;
    certificateId: string;
    address: string;
    userId: string;
    regionId: number;
    avatar: FileUpload;
    certificate: FileUpload;
    certificateBack: FileUpload;
    nationalCard: FileUpload;
    nationalCardBack: FileUpload;
    serviceId: number;
};
