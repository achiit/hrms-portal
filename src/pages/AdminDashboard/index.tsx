import React from 'react';
import EmployeeList from './EmployeeList';
import RegularisationRequests from './RegularisationRequests';
import AddEmployee from './AddEmployee';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-light p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-display">Admin Dashboard</h1>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AddEmployee />
            <EmployeeList />
          </div>
          <RegularisationRequests />
        </div>
      </div>
    </div>
  );
}