/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUpload } from './FileUpload';
import type { ServiceTypeTranslationRequest } from './ServiceTypeTranslationRequest';

export type CreateServiceTypeRequest = {
    icon: FileUpload;
    translations: Array<ServiceTypeTranslationRequest>;
};
