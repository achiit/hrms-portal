export interface Employee {
  id: string;
  name: string;
  employeeCode: string;
  email: string;
  absentCount: number;
  regulariseCount: number;
  lateCount: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: Date;
  punchIn: Date | null;
  punchOut: Date | null;
  photo: string;
  ipAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface RegularisationRequest {
  id: string;
  employeeId: string;
  date: Date;
  loginTime: Date;
  logoutTime: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}