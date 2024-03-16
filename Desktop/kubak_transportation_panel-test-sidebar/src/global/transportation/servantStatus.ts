import { ServantStatusEnum } from "@/backend/transport";

export const servantStatus = [
  {
    name: ServantStatusEnum.ONLINE,
    id: "Online",
  },
  {
    name: ServantStatusEnum.OFFLINE,
    id: "Offline",
  },
  {
    name: ServantStatusEnum.IN_TRIP,
    id: "InTrip",
  },
  {
    name: ServantStatusEnum.DISCONNECT_IN_TRIP,
    id: "DisconnectInTrip",
  },
];
export function servantStatusColor(status) {
  switch (status) {
    case "Online":
      return "#05bb00";

    case "Offline":
      return "#9e9e9e";

    case "InTrip":
      return "#db0efd";

    case "DisconnectInTrip":
      return "#cf0707";
  }
}
