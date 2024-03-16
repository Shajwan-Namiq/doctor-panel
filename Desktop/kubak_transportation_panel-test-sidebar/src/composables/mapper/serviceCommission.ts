import type { DayOfWeek } from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMapper, createMap, forMember, mapFrom } from "@automapper/core";
import { toLocaleTimeOnly, toUtcTimeOnly } from "../dateTimeFormat";
import moment from "moment";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateCommissionPeriodRequest {
  id?: number;
  value?: number;
  start?: string;
  end?: string;
  dayOfWeeks?: Array<DayOfWeek> | null;
}
export class CreateCommissionPeriodRequestDto {
  id?: number;
  value?: number;
  start?: string;
  end?: string;
  dayOfWeeks?: Array<DayOfWeek> | null;
}
export class AddNewCommissionPeriod {
  id?: number;
  value?: number;
  start?: string;
  end?: string;
  dayOfWeeks?: Array<DayOfWeek> | null;
}
export class AddNewCommissionPeriodDto {
  id?: number;
  value?: number;
  start?: string;
  end?: string;
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
    (d) => d.start,
    mapFrom((s) => toUtcTimeOnly(s.start))
  ),
  forMember(
    (d) => d.end,
    mapFrom((s) => toUtcTimeOnly(s.end))
  ),
  forMember(
    (d) => d.dayOfWeeks,
    mapFrom((s) => s.dayOfWeeks)
  )
);

createMap(
  mapper,
  CreateCommissionPeriodRequestDto,
  CreateCommissionPeriodRequest,
  forMember(
    (d) => d.id,
    mapFrom((s) => s.id)
  ),
  forMember(
    (d) => d.value,
    mapFrom((s) => s.value)
  ),
  forMember(
    (d) => d.start,
    mapFrom((s) => toLocaleTimeOnly(s.start))
  ),
  forMember(
    (d) => d.end,
    mapFrom((s) => toLocaleTimeOnly(s.end))
  ),
  forMember(
    (d) => d.dayOfWeeks,
    mapFrom((s) => s.dayOfWeeks)
  )
);

export function mapCreateCommissionPeriodRequest(
  source: CreateCommissionPeriodRequest[]
): CreateCommissionPeriodRequestDto[] {
  return mapper.mapArray(
    source,
    CreateCommissionPeriodRequest,
    CreateCommissionPeriodRequestDto
  );
}

export function addNewPeriodModel(
  source: AddNewCommissionPeriod
): AddNewCommissionPeriodDto {
  createMap(
    mapper,
    AddNewCommissionPeriod,
    AddNewCommissionPeriodDto,
    forMember(
      (d) => d.id,
      mapFrom((s) => s.id)
    ),
    forMember(
      (d) => d.value,
      mapFrom((s) => s.value)
    ),
    forMember(
      (d) => d.start,
      mapFrom((s) => moment(s.start).format("HH:mm:ss"))
    ),
    forMember(
      (d) => d.end,
      mapFrom((s) => moment(s.end).format("HH:mm:ss"))
    ),
    forMember(
      (d) => d.dayOfWeeks,
      mapFrom((s) => s.dayOfWeeks)
    )
  );
  return mapper.map(source, AddNewCommissionPeriod, AddNewCommissionPeriodDto);
}

export function mapGetCommissionPeriodRequest(
  source: CreateCommissionPeriodRequestDto[]
): CreateCommissionPeriodRequest[] {
  return mapper.mapArray(
    source,
    CreateCommissionPeriodRequestDto,
    CreateCommissionPeriodRequest
  );
}
