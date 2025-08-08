export interface SignupRequest {
  name: string;
  phone: string;
  studentId: string;
  department: string;
  generation: number;
  handle?: string;
}