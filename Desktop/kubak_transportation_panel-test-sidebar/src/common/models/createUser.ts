import type { Gender, Language, UserType } from "@/backend/auth";

export interface CreateUser {
  email?: string;
  emailVerified?: boolean;
  password?: string;
  displayName: string;
  phoneNumber?: string;
  photo?: Blob;
  disabled?: boolean;
  roleIds: Array<number>;
  gender?: Gender;
  language?: Language;
  userType?: UserType;
  regionId?: number;
}
