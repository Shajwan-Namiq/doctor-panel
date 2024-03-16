import type { UserDto, RegionDto } from "@/backend/auth";
import type { WalletTransactionType } from "@/backend/wallet";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class TransactionFilter {
  transactionType?: WalletTransactionType;
  sourceWalletUserId?: string;
  destinationWalletUserId?: string;
  minTransactionPrice?: number;
  maxTransactionPrice?: number;
  fromDateTime?: string;
  toDateTime?: string;
  senderWalletUserRegionId?: number;
  receiverWalletUserRegionId?: number;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
  transactionContainsUserId?: string;
}

export class TransactionFilterDto {
  transactionType?: WalletTransactionType;
  sourceWalletUser?: UserDto;
  destinationWalletUser?: UserDto;
  minTransactionPrice?: number;
  maxTransactionPrice?: number;
  fromDateTime?: Date;
  toDateTime?: Date;
  senderWalletUserRegion?: RegionDto;
  receiverWalletUserRegion?: RegionDto;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
  transactionContainsUser?: UserDto;
}

createMap(
  mapper,
  TransactionFilterDto,
  TransactionFilter,
  forMember(
    (d) => d.transactionType,
    mapFrom((s) => s.transactionType)
  ),
  forMember(
    (d) => d.sourceWalletUserId,
    mapFrom((s) => s.sourceWalletUser?.uid)
  ),
  forMember(
    (d) => d.destinationWalletUserId,
    mapFrom((s) => s.destinationWalletUser?.uid)
  ),

  forMember(
    (d) => d.minTransactionPrice,
    mapFrom((s) => s.minTransactionPrice)
  ),
  forMember(
    (d) => d.maxTransactionPrice,
    mapFrom((s) => s.maxTransactionPrice)
  ),
  forMember(
    (d) => d.fromDateTime,
    mapFrom((s) => (s.fromDateTime ? toUtc(s.fromDateTime) : undefined))
  ),
  forMember(
    (d) => d.toDateTime,
    mapFrom((s) => (s.toDateTime ? toUtc(s.toDateTime) : undefined))
  ),

  forMember(
    (d) => d.senderWalletUserRegionId,
    mapFrom((s) => s.senderWalletUserRegion?.id)
  ),
  forMember(
    (d) => d.receiverWalletUserRegionId,
    mapFrom((s) => s.receiverWalletUserRegion?.id)
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => s.page)
  ),
  forMember(
    (d) => d.sortField,
    mapFrom((s) => s.sortField)
  ),
  forMember(
    (d) => d.sortDescending,
    mapFrom((s) => s.sortDescending)
  ),
  forMember(
    (d) => d.transactionContainsUserId,
    mapFrom((s) => s.transactionContainsUser?.uid)
  )
);
export function createMapTransactionFilterDto(
  data: TransactionFilterDto
): TransactionFilter {
  return mapper.map(data, TransactionFilterDto, TransactionFilter);
}
