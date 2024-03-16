import { currentUser } from "@/stores/currentUser";

export function ifUserHasPolicy(policyName: string) {
  const currentUserStore = currentUser();
  return currentUserStore.policies.includes(policyName);
}
