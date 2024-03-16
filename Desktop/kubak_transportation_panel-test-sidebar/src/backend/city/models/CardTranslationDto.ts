/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardLinkType } from './CardLinkType';
import type { Language } from './Language';

export type CardTranslationDto = {
    id?: number;
    title?: string | null;
    link?: string | null;
    linkType?: CardLinkType;
    imgUrl?: string | null;
    language?: Language;
};
