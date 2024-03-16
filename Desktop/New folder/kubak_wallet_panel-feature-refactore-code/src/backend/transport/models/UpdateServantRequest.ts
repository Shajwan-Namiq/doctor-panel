/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUpload } from './FileUpload';

export type UpdateServantRequest = {
    firstName: string;
    lastName: string;
    nationalId: string;
    certificateId: string;
    regionId: number;
    serviceId: number;
    address: string;
    avatar?: FileUpload;
    certificate?: FileUpload;
    certificateBack?: FileUpload;
    nationalCard?: FileUpload;
    nationalCardBack?: FileUpload;
};
