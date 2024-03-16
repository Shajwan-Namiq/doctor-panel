import type { RoleDto } from "@/backend/auth";
import type { TranslationRequest } from "@/backend/transport";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class CreateUpdateCancelReasonRequest {
  roleId!: number;
  translations!: Array<TranslationRequest>;
}
export class CreateUpdateCancelReasonRequestDto {
  role?: RoleDto;
  translations?: Array<TranslationRequest>;
}
function filterTranslations(
  translations: Array<TranslationRequest>
): Array<TranslationRequest> {
  return translations.filter((t) => t.text);
}
createMap(
  mapper,
  CreateUpdateCancelReasonRequestDto,
  CreateUpdateCancelReasonRequest,
  forMember(
    (d) => d.roleId,
    mapFrom((s) => s.role!.id)
  ),
  forMember(
    (d) => d.translations,
    mapFrom((s) => filterTranslations(s.translations!))
  )
);

export function mapCreateUpdateCancelReasonRequest(
  source: CreateUpdateCancelReasonRequestDto
): CreateUpdateCancelReasonRequest {
  return mapper.map(
    source,
    CreateUpdateCancelReasonRequestDto,
    CreateUpdateCancelReasonRequest
  );
}
