import type { DayOfWeek } from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMapper, createMap, forMember, mapFrom } from "@automapper/core";
import { toUtcTimeOnly } from "../dateTimeFormat";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateCommissionPeriodRequest {
  id?: number;
  value?: number;
  startDate?: string;
  endDate?: string;
  dayOfWeeks?: Array<DayOfWeek> | null;
}
export class CreateCommissionPeriodRequestDto {
  id?: number;
  value?: number;
  startDate?: string;
  endDate?: string;
  dayOfWeeks?: Array<DayOfWeek> | null;
}

createMap(
  mapper,
  CreateCommissionPeriodRequest,
  CreateCommissionPeriodRequestDto,
  forMember(
    (d) => d.id,
    mapFrom((s) => s.id)
  ),
  forMember(
    (d) => d.value,
    mapFrom((s) => s.value)
  ),
  forMember(
    (d) => d.startDate,
    mapFrom((s) => toUtcTimeOnly(s.startDate))
  ),
  forMember(
    (d) => d.endDate,
    mapFrom((s) => toUtcTimeOnly(s.endDate))
  ),
  forMember(
    (d) => d.dayOfWeeks,
    mapFrom((s) => s.dayOfWeeks)
  )
);

export function mapCreateCommissionPeriodRequest(
  source: CreateCommissionPeriodRequest
): CreateCommissionPeriodRequestDto {
  return mapper.map(
    source,
    CreateCommissionPeriodRequest,
    CreateCommissionPeriodRequestDto
  );
}
