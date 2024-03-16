export function tripStatusesColor(TripStatus) {
  switch (TripStatus) {
    case "RequestCanceled":
    case "CanceledAfterReserve":
    case "CanceledAfterArrive":
    case "CanceledAfterStart":
    case "CanceledRequest":
      return "#d91010";
    case "Timeout":
      return "#F7E070";
    case "Waiting":
      return "#343434";
    case "Accept":
    case "Accepted":
    case "Reserve":
    case "Arrive":
    case "Start":
    case "Stop":
    case "Continue":
      return "#00bf2d";
    case "End":
      return "#ed7f22";
    case "Completed":
      return "#ed7f22";
  }
}

export function tripStatusesBorderColor(TripStatus) {
  switch (TripStatus) {
    case "RequestCanceled":
    case "CanceledAfterReserve":
    case "CanceledAfterArrive":
    case "CanceledAfterStart":
    case "CanceledRequest":
      return "#6C0505";
    case "Timeout":
      return "#766307";
    case "Waiting":
      return "#434242";
    case "Accept":
    case "Accepted":
    case "Reserve":
    case "Arrive":
    case "Start":
    case "Stop":
    case "Continue":
      return "#1F7287";
    case "End":
      return "#B75401";
    case "Completed":
      return "#B75401";
  }
}
