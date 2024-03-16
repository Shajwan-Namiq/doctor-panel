import { RequestAlertStatus } from "@/backend/transport";

export function alertServantStatusColor(servantStatus: RequestAlertStatus) {
  switch (servantStatus) {
    case RequestAlertStatus.ACCEPTED:
      return "#37d6ff";
    case RequestAlertStatus.IGNORED:
      return "#05bb00";
    case RequestAlertStatus.REJECTED:
      return "#cf0707";
    case RequestAlertStatus.OUT_OF_RANGE:
      return "#9e9e9e";
  }
}
