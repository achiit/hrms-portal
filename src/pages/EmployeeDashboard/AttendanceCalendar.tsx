import React from 'react';
import Calendar from 'react-calendar';
import { useAttendanceCalendar } from '../../hooks/useAttendanceCalendar';
import { format } from 'date-fns';
import Card from '../../components/common/Card';

export default function AttendanceCalendar() {
  const { attendanceData, handleDateClick } = useAttendanceCalendar();

  const getTileClassName = ({ date }: { date: Date }) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const attendance = attendanceData[dateKey];

    if (!attendance || !attendance.punchIn) {
      return 'bg-red-200';
    }

    const punchInDate = attendance.punchIn.toDate();
    if (punchInDate.getHours() > 9 || 
        (punchInDate.getHours() === 9 && punchInDate.getMinutes() > 30) ||
        !attendance.punchOut) {
      return 'bg-yellow-200';
    }

    return 'bg-green-200';
  };

  return (
    <Card title="Attendance Calendar">
      <Calendar
        className="w-full border-2 border-dark p-4"
        tileClassName={getTileClassName}
        onClickDay={handleDateClick}
      />
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 border border-dark"></div>
          <span>On Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200 border border-dark"></div>
          <span>Late/Incomplete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 border border-dark"></div>
          <span>Absent</span>
        </div>
      </div>
    </Card>
  );
}