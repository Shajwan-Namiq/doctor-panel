import type { RegionDto } from "@/backend/auth";
import type { FileUpload, ServiceDto } from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateUpdateServantRequest {
  firstName!: string;
  lastName!: string;
  nationalId!: string;
  certificateId!: string;
  address!: string;
  userId!: string;
  regionId!: number;
  avatar!: FileUpload;
  certificate!: FileUpload;
  certificateBack!: FileUpload;
  nationalCard!: FileUpload;
  nationalCardBack!: FileUpload;
  serviceId!: number;
}
export class CreateUpdateServantRequestDto {
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  certificateId?: string;
  address?: string;
  userId?: string;
  region?: RegionDto;
  avatar?: FileUpload;
  certificate?: FileUpload;
  certificateBack?: FileUpload;
  nationalCard?: FileUpload;
  nationalCardBack?: FileUpload;
  service?: ServiceDto;
}

createMap(
  mapper,
  CreateUpdateServantRequestDto,
  CreateUpdateServantRequest,
  forMember(
    (d) => d.firstName,
    mapFrom((s) => s.firstName)
  ),
  forMember(
    (d) => d.lastName,
    mapFrom((s) => s.lastName)
  ),
  forMember(
    (d) => d.nationalId,
    mapFrom((s) => s.nationalId)
  ),
  forMember(
    (d) => d.certificateId,
    mapFrom((s) => s.certificateId)
  ),
  forMember(
    (d) => d.address,
    mapFrom((s) => s.address)
  ),
  forMember(
    (d) => d.userId,
    mapFrom((s) => s.userId)
  ),
  forMember(
    (d) => d.regionId,
    mapFrom((s) => s.region?.id)
  ),
  forMember(
    (d) => d.avatar,
    mapFrom((s) => s.avatar)
  ),
  forMember(
    (d) => d.certificate,
    mapFrom((s) => s.certificate)
  ),
  forMember(
    (d) => d.certificateBack,
    mapFrom((s) => s.certificateBack)
  ),
  forMember(
    (d) => d.nationalCard,
    mapFrom((s) => s.nationalCard)
  ),
  forMember(
    (d) => d.nationalCardBack,
    mapFrom((s) => s.nationalCardBack)
  ),
  forMember(
    (d) => d.serviceId,
    mapFrom((s) => s.service?.id)
  )
);
export function mapCreateUpdateServantRequest(
  request: CreateUpdateServantRequestDto
): CreateUpdateServantRequest {
  return mapper.map(
    request,
    CreateUpdateServantRequestDto,
    CreateUpdateServantRequest
  );
}
