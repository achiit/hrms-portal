import React from 'react';
import { formatTime, formatDate } from '../../utils/dateUtils';

interface AttendanceCardProps {
  date: Date;
  status: 'present' | 'absent' | 'late';
  punchIn?: Date;
  punchOut?: Date;
}

export default function AttendanceCard({ date, status, punchIn, punchOut }: AttendanceCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'present':
        return 'bg-green-100';
      case 'absent':
        return 'bg-red-100';
      case 'late':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`card ${getStatusColor()}`}>
      <p className="font-bold">{formatDate(date)}</p>
      {punchIn && <p className="text-sm">Punch In: {formatTime(punchIn)}</p>}
      {punchOut && <p className="text-sm">Punch Out: {formatTime(punchOut)}</p>}
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
}