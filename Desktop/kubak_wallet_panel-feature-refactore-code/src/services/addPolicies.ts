import { RoleStore } from "@/stores/common/role";

export async function addPolicies(store) {
  await store.getCurrentUserInfo();

  // Ensure that the user's information is fetched
  if (!store.userInfo?.uid) {
    await store.getCurrentUserInfo();
  }

  const currentUserProfile = store.userInfo;
  const roleStore = RoleStore();

  if (currentUserProfile) {
    try {
      await roleStore.getAllPolicies();
      const policyNames = roleStore.policies.map((policy) => policy.name);
      store.addPolicies(policyNames);
    
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  }
}
