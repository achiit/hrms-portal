import React from 'react';
import { User, Mail, Hash } from 'lucide-react';
import { Employee } from '../../types';
import Card from '../common/Card';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Card className="bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="text-primary" size={16} />
            <span className="font-bold">{employee.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-primary" size={16} />
            <span className="text-sm text-gray-600">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="text-primary" size={16} />
            <span className="text-sm text-gray-600">Code: {employee.employeeCode}</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm">
            Late: <span className="font-bold">{employee.lateCount}</span>
          </p>
          <p className="text-sm">
            Absent: <span className="font-bold">{employee.absentCount}</span>
          </p>
          <p className="text-sm">
            Regularised: <span className="font-bold">{employee.regulariseCount}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}