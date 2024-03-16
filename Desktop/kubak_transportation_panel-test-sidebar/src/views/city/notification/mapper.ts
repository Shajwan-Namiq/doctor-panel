/* eslint-disable prettier/prettier */
import type { Language, UserDto } from "@/backend/auth";
import {
  PanelPushNotificationType,
  type AppRouteDto,
  type PushNotificationButtonRequest,
} from "@/backend/city";
import type { GroupDto, RoleDto } from "@/backend/transport";
import type { RegionDto } from "@/backend/wallet";
import { toUtc } from "@/composables/dateTimeFormat";
import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";

const mapper = createMapper({ strategyInitializer: classes() });

export class NotificationListFilterRequest {
  startAt?: string;
  endAt?: string;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}
export class NotificationListFilterDto {
  startAt?: Date;
  endAt?: Date;
  page?: number;
  sortField?: string;
  sortDescending?: boolean;
}

createMap(
  mapper,
  NotificationListFilterDto,
  NotificationListFilterRequest,
  forMember(
    (d) => d.startAt,
    mapFrom((s) => (s.startAt ? toUtc(s.startAt) : undefined))
  ),
  forMember(
    (d) => d.endAt,
    mapFrom((s) => (s.endAt ? toUtc(s.endAt) : undefined))
  ),
  forMember(
    (d) => d.page,
    mapFrom((s) => (s.page ? s.page : undefined))
  ),
  forMember(
    (d) => d.sortField,
    mapFrom((s) => (s.sortField ? s.sortField : undefined))
  ),
  forMember(
    (d) => d.sortDescending,
    mapFrom((s) => (s.sortDescending ? s.sortDescending : undefined))
  )
);
export class SendNotification {
  type?: PanelPushNotificationType;
  route?: string | null;
  messages?: Array<NotificationMessageDto> | null;
  userIds?: Array<string> | null;
  roleIds?: Array<number> | null;
  regionIds?: Array<number> | null;
  groupIds?: Array<number> | null;
  expirationDate?: string | null;
  button?: PushNotificationButtonRequest;
  scheduledTo?: string | null;
}

export class SendNotificationDto {
  type?: PanelPushNotificationType;
  route?: AppRouteDto;
  messages?: Array<NotificationMessageDto> | null;
  users?: UserDto[];
  roles?: RoleDto[];
  regions?: Array<RegionDto> | null;
  groups?: GroupDto[];
  expirationDate?: Date;
  scheduledTo?: Date;
  button?: PushNotificationButtonRequest;
}
export class NotificationMessageDto {
  title?: string;
  subTitle?: string | null;
  description?: string;
  image?: {
    bytes?: string;
    fileName?: string;
    existingFileUrl?: string;
    imageFile?: string;
  };
  language?: Language;
}
function checkIfLengthMoreThanOne(field) {
  return field.length > 0 ? true : false;
}
function messages(source) {
  return source.filter(
    (x) => x.title != undefined && x.title != null && x.title != ""
  );
}

function getPath(source) {
  return {
    title: source.title,
    route: source.route.path,
  };
}
createMap(
  mapper,
  SendNotificationDto,
  SendNotification,
  forMember(
    (d) => d.type,
    mapFrom((s) => s.type)
  ),
  forMember(
    (d) => d.route,
    mapFrom((s) =>
      s.type == PanelPushNotificationType.ROUTING ? s.route?.path : undefined
    )
  ),
  forMember(
    (d) => d.messages,
    mapFrom((s) => messages(s.messages))
  ),
  forMember(
    (d) => d.userIds,
    mapFrom((s) =>
      s.users && checkIfLengthMoreThanOne(s.users)
        ? s.users?.map((u) => u.uid)
        : undefined
    )
  ),
  forMember(
    (d) => d.roleIds,
    mapFrom((s) =>
      s.roles && checkIfLengthMoreThanOne(s.roles)
        ? s.roles?.map((r) => r.id)
        : undefined
    )
  ),
  forMember(
    (d) => d.regionIds,
    mapFrom((s) => s.regions?.map((r) => r.id))
  ),
  // forMember(
  //   (d) => d.regionIds,
  //   mapFrom((s) =>
  //     s.regions && checkIfLengthMoreThanOne(s.regions)
  //       ? s.regions?.map((r) => r.id)
  //       : undefined
  //   )
  // ),
  forMember(
    (d) => d.groupIds,
    mapFrom((s) =>
      s.groups && checkIfLengthMoreThanOne(s.groups)
        ? s.groups?.map((g) => g.id)
        : undefined
    )
  ),
  forMember(
    (d) => d.expirationDate,
    mapFrom((s) => (s.expirationDate ? toUtc(s.expirationDate) : undefined))
  ),
  forMember(
    (d) => d.scheduledTo,
    mapFrom((s) => (s.scheduledTo ? toUtc(s.scheduledTo) : undefined))
  ),
  forMember(
    (d) => d.button,
    mapFrom((s) =>
      s.type == PanelPushNotificationType.ANNOUNCEMENT
        ? s.button?.title
          ? getPath(s.button)
          : undefined
        : undefined
    )
  ),
  forMember(
    (d) => d.messages,
    mapFrom((s) => {
      return messages(s.messages).map((msg) => ({
        ...msg,
        image: msg.image
          ? {
              bytes: msg.image.bytes,
              fileName: msg.image.fileName,
              existingFileUrl: msg.image.existingFileUrl,
            }
          : undefined,
      }));
    })
  )
);

export function createMapSendNotificationDtoToSendNotification(
  data: SendNotificationDto
): SendNotification {
  return mapper.map(data, SendNotificationDto, SendNotification);
}
export function mapNotificationListFilterDtoToRequest(
  data: NotificationListFilterDto
): NotificationListFilterRequest {
  return mapper.map(
    data,
    NotificationListFilterDto,
    NotificationListFilterRequest
  );
}
