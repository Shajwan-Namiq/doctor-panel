/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadedFileType } from './UploadedFileType';

export type UploadedFile = {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    id?: string;
    type?: UploadedFileType;
    fileUrl?: string | null;
};
