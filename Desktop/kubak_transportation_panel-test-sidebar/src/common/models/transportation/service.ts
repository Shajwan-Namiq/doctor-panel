export type CreateServiceRequest = {
  regionId?: number;
  serviceTypeId?: number;
};

export type CreateServiceRequestParams = {
  basePrice?: number;
  priceRatePerDistanceWithDestination?: number;
  priceRatePerDurationWithDestination?: number;
  priceRatePerDistanceWithoutDestination?: number;
  priceRatePerDurationWithoutDestination?: number;
  pricePerEachStop?: number;
  priceRateDuringStopTime?: number;
  nightPriceRiseRate?: number;
  minPrice?: number;
  tipPrice?: number;
  minTip?: number;
  maxTip?: number;
  nightPeriods?: Array<NightPeriod>;
};
export type NightPeriod = { periodStart?: number; periodEnd?: number };

export type NotifyServantPreferenceRequest = {
  firstDuration?: number;
  gapDuration?: number;
  gapDistance?: number;
  maxDistance?: number;
  requestTtl?: number;
  maxNewRequestAlertAllowedDistance?: number;
  defaultNewRequestAlertDistance?: number;
  minNewRequestAlertAllowedDistance?: number;
};
