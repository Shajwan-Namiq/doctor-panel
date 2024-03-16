/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DestinationType } from './DestinationType';

export type AreaPriceRequestTypeDto = {
    id?: number;
    areaPriceId?: number;
    destinationType?: DestinationType;
    priceRatePerDistance?: number;
};
