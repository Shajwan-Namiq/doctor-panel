export class TotalCounts {
  canceledTaskStates?: {
    name: string,
    canceledTaskCount: number
  };
  completedTaskStates
    ?: {
      name: string,
      completedTaskCount: number
    };
  requestStates?: {
    name: string,
    requestCount: number
  }
}