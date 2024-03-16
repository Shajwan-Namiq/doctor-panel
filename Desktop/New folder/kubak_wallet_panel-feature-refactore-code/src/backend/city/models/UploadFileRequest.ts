/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUpload } from './FileUpload';
import type { UploadedFileType } from './UploadedFileType';

export type UploadFileRequest = {
    file: FileUpload;
    type: UploadedFileType;
};
