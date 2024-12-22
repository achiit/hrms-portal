import React from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import { Users } from 'lucide-react';
import Card from '../../components/common/Card';
import EmployeeCard from '../../components/employee/EmployeeCard';

export default function EmployeeList() {
  const { employees, loading } = useEmployees();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-primary" />
        <h2 className="text-2xl font-bold">Employee List</h2>
      </div>
      <div className="space-y-4">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </Card>
  );
}