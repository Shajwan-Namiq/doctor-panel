/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUpload } from './FileUpload';
import type { ServiceTypeTranslationRequest } from './ServiceTypeTranslationRequest';

export type UpdateServiceTypeRequest = {
    icon?: FileUpload;
    translations: Array<ServiceTypeTranslationRequest>;
};
