import type { UserDto } from "@/backend/auth";
import type { RoleDto } from "@/backend/city";
import type { WalletType } from "@/backend/wallet";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class WalletFilterData {
  userIds?: Array<string>;
  roleIds?: Array<number>;
  minBalance?: number;
  maxBalance?: number;
  walletType?: WalletType;
  page?: number;
  limit?: number;
  sortField?: string;
  sortDescending?: boolean;
}

export class WalletFilterDataDto {
  users?: UserDto[];
  roles?: RoleDto[];
  minBalance?: number;
  maxBalance?: number;
  walletType?: WalletType;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}
createMap(
  mapper,
  WalletFilterDataDto,
  WalletFilterData,
  forMember(
    (d) => d.minBalance,
    mapFrom((s) => s.minBalance)
  ),
  forMember(
    (d) => d.maxBalance,
    mapFrom((s) => s.maxBalance)
  ),
  forMember(
    (d) => d.userIds,
    mapFrom((s) => s.users?.map((x) => x.uid))
  ),
  forMember(
    (d) => d.roleIds,
    mapFrom((s) => s.roles?.map((r) => r.id))
  ),
  forMember(
    (d) => d.walletType,
    mapFrom((s) => s.walletType)
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
    (d) => d.page,
    mapFrom((s) => s.page)
  )
);
export function createMapWalletFilterDtoToWalletFilter(
  data: WalletFilterDataDto
): WalletFilterData {
  return mapper.map(data, WalletFilterDataDto, WalletFilterData);
}
