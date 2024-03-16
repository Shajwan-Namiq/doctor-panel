import { RequestStatusEnum, TripStatusEnum } from "@/backend/transport";

export function checkRequestStatus(statuses: string[], forPanel: boolean = false) {
  let statusList: number[] = [];
  if (forPanel) {
    for (let status of statuses) {
      for (let requestStatus of getRequestStatus(status)!) {
        statusList.push(requestStatus)
      }
    }
  }
  else {

    for (let status of statuses) {
      statusList.push(sendRequestStatus(status)!)
    }
  }

  return statusList;
}
function getRequestStatus(status) {
  switch (status) {
    case "Waiting": {
      return [1]
    }
    case "Accepted": {
      return [2, 3, 4, 5, 6, 7]
    }
    case "Completed": {
      return [8]
    }
    case "Cancel": {
      return [-1, -3, -4]
    }
    case "Timeout": {
      return [0]
    }
    default: {
      return []
    }
  }
}
function sendRequestStatus(status) {
  switch (status) {
    case "Waiting": {
      return 1
    }
    case "Accepted": {
      return 2
    }
    case "Completed": {
      return 3
    }
    case "CanceledRequest": {
      return -1
    }
    case "Timeout": {
      return 0
    }
  }
}
export function checkTripStatus(status) {
  switch (status) {
    case "Accept":
    case "Accepted":
    case "Reserve":
    case "Arrive":
    case "Start":
    case "Stop":
    case "Continue":
    case "Completed":
      return true;
    default: return false
  }

}
export function checkIfTripStatusExistInSelectedStatuses(status, currentTripStatuses) {
  switch (status) {
    case TripStatusEnum.START:
    case TripStatusEnum.ARRIVE:
    case TripStatusEnum.CONTINUE:
    case TripStatusEnum.STOP:
    case TripStatusEnum.RESERVE:
    case TripStatusEnum.ACCEPTED:
      return currentTripStatuses.includes(
        RequestStatusEnum.ACCEPTED
      );

    case TripStatusEnum.TIMEOUT:
      return currentTripStatuses.includes(
        RequestStatusEnum.TIMEOUT
      );
    case TripStatusEnum.WAITING:
      return currentTripStatuses.includes(
        RequestStatusEnum.WAITING
      );
    case TripStatusEnum.COMPLETED:
    case TripStatusEnum.END:
      return currentTripStatuses.includes(
        RequestStatusEnum.COMPLETED
      );
    case TripStatusEnum.CANCELED_AFTER_ARRIVE:
    case TripStatusEnum.CANCELED_AFTER_RESERVE:
    case TripStatusEnum.CANCELED_AFTER_START:
    case TripStatusEnum.REQUEST_CANCELED:
      return currentTripStatuses.includes("CanceledRequest");
    default:
      return false;
  }

}