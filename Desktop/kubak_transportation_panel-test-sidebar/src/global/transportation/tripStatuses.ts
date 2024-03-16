export const tripStatus = [
  { status: 0, name: "Timeout" },
  { status: 1, name: "Waiting" },
  { status: 2, name: "Accepted" },
  { status: 3, name: "Reserve" },
  { status: 4, name: "Arrive" },
  { status: 5, name: "Start" },
  { status: 6, name: "Stop" },
  { status: 7, name: "Continue" },
  { status: 8, name: "End" },
  { status: 9, name: "Completed" },
  { status: -1, name: "CanceledAtWaiting" },
  { status: -3, name: "CanceledAfterReserve" },
  { status: -4, name: "CanceledAfterArrive" },
];

export const filterTripStatus = [
  { status: 0, name: "Timeout" },
  { status: 1, name: "Waiting" },
  { status: 2, name: "Accepted" },
  { status: 3, name: "Completed" },
  { status: -1, name: "CanceledRequest" },
];
