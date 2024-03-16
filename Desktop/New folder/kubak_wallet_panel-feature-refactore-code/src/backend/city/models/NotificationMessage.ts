/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EnhancedFileUpload } from './EnhancedFileUpload';
import type { Language } from './Language';

export type NotificationMessage = {
    title: string;
    subTitle?: string | null;
    description?: string | null;
    image?: EnhancedFileUpload;
    language: Language;
};
