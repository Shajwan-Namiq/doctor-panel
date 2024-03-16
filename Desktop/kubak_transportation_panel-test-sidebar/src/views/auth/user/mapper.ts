import type { Gender, UserType } from "@/backend/auth";
import type { RegionDto } from "@/backend/city";
import type { Language } from "@/backend/transport";
import type { RoleDto } from "@/backend/wallet";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class UserList {
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  displayName!: string;
  phoneNumber?: string;
  photo?: Blob;
  photoUrl?: string;
  disabled?: boolean;
  roleIds!: Array<number>;
  gender!: Gender;
  language!: Language;
  userType?: UserType;
  regionId!: number;
  removePhoto?: boolean;
  region?: RegionDto;
}

export class UserListDto {
  email?: string;
  emailVerified?: boolean;
  password?: string;
  displayName!: string;
  phoneNumber?: string;
  photo?: Blob;
  photoUrl?: string;
  disabled?: boolean;
  roles!: Array<RoleDto>;
  gender!: Gender;
  language!: Language;
  userType?: UserType;
  region!: RegionDto;
  regionId?: number;
  uid?: string | null;
  removePhoto?: boolean;
}

export class GetUserListDto {
  uid?: string | null;
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoUrl?: string | null;
  photo?: Blob;
  emailVerified?: boolean;
  disabled?: boolean;
  roles?: Array<RoleDto> | null;
  gender?: Gender;
  language?: Language;
  regionId?: number | null;
  region?: RegionDto;
  userType?: UserType;
  password?: string;
}

createMap(
  mapper,
  UserListDto,
  UserList,
  forMember(
    (d) => d.displayName,
    mapFrom((s) => s.displayName)
  ),
  forMember(
    (d) => d.phoneNumber,
    mapFrom((s) => s.phoneNumber)
  ),
  forMember(
    (d) => d.email,
    mapFrom((s) => s.email)
  ),
  forMember(
    (d) => d.disabled,
    mapFrom((s) => s.disabled)
  ),
  forMember(
    (d) => d.roleIds,
    mapFrom((s) => s.roles?.map((r) => r.id))
  ),
  forMember(
    (d) => d.emailVerified,
    mapFrom((s) => s.emailVerified)
  ),
  forMember(
    (d) => d.photo,
    mapFrom((s) => s.photo)
  ),
  forMember(
    (d) => d.gender,
    mapFrom((s) => s.gender)
  ),
  forMember(
    (d) => d.language,
    mapFrom((s) => s.language)
  ),
  forMember(
    (d) => d.userType,
    mapFrom((s) => s.userType)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.removePhoto,
    mapFrom((s) => s.removePhoto)
  ),
  forMember(
    (d) => d.password,
    mapFrom((s) => s.password)
  )
);

createMap(
  mapper,
  GetUserListDto,
  UserList,
  forMember(
    (d) => d.uid,
    mapFrom((s) => s.uid)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.regionId)
  ),
  forMember(
    (d) => d.displayName,
    mapFrom((s) => s.displayName)
  ),
  forMember(
    (d) => d.phoneNumber,
    mapFrom((s) => s.phoneNumber)
  ),
  forMember(
    (d) => d.email,
    mapFrom((s) => s.email)
  ),
  forMember(
    (d) => d.disabled,
    mapFrom((s) => s.disabled)
  ),
  forMember(
    (d) => d.roleIds,
    mapFrom((s) => s.roles?.map((r) => r.id))
  ),
  forMember(
    (d) => d.emailVerified,
    mapFrom((s) => s.emailVerified)
  ),
  forMember(
    (d) => d.photo,
    mapFrom((s) => s.photo)
  ),
  forMember(
    (d) => d.gender,
    mapFrom((s) => s.gender)
  ),
  forMember(
    (d) => d.language,
    mapFrom((s) => s.language)
  ),
  forMember(
    (d) => d.userType,
    mapFrom((s) => s.userType)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.userType,
    mapFrom((s) => s.userType)
  ),
  forMember(
    (d) => d.password,
    mapFrom((s) => s.password)
  )
);

export function CreateMapUserListDto(source: UserListDto): UserList {
  return mapper.map(source, UserListDto, UserList);
}

export function GetMapGetUserListDto(source: GetUserListDto): UserList {
  return mapper.map(source, GetUserListDto, UserList);
}
