/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardLinkType } from './CardLinkType';
import type { FileUpload } from './FileUpload';
import type { Language } from './Language';

export type CreateCardTranslationRequest = {
    title: string;
    link?: string | null;
    linkType?: CardLinkType;
    image: FileUpload;
    language: Language;
};
