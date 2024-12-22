import React from 'react';
import AttendanceActions from './AttendanceActions';
import AttendanceOverview from './AttendanceOverview';
import EmployeeInfo from './EmployeeInfo';
import AttendanceCalendar from './AttendanceCalendar';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-light p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-display">Employee Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AttendanceActions />
            <EmployeeInfo user={user} />
          </div>
          <div className="space-y-6">
            <AttendanceOverview />
            <AttendanceCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}