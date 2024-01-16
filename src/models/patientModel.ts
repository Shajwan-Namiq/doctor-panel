export interface PatientModel {
  id: number;
  created_at: string;
  cardId: number;
  userImage: string;
  gender: string;
  emergencyContactName?: string;
  city?: string;
  address?: string;
  email?: string;
  contactNumber?: string;
  dateOfBirth?: string;
  fullName?: string;
}
