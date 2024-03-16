import type {
  CreateUpdateTaskCancellationPolicyMeasurementRequest,
  RoleType,
} from "@/backend/transport";

export type CreateUpdateTaskCancellationPolicyRequestType = {
  cancellerRole: RoleType;
  measurements: Array<CreateUpdateTaskCancellationPolicyMeasurementRequest>;
};
