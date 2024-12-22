import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export default function TodayAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
  try {
        const today = new Date();
        const startOfDay = Timestamp.fromDate(new Date(today.setHours(0, 0, 0, 0)));
        const endOfDay = Timestamp.fromDate(new Date(today.setHours(23, 59, 59, 999)));

        const attendanceRef = collection(db, 'attendance');
        const q = query(
          attendanceRef,
          where('date', '>=', startOfDay),
          where('date', '<=', endOfDay)
        );

        const querySnapshot = await getDocs(q);
        const attendanceData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAttendance(attendanceData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="card p-6 bg-white shadow rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Today's Attendance</h2>
      {attendance.length === 0 ? (
        <p className="text-gray-600 text-sm">No attendance records for today.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Employee ID</th>
                <th className="border p-2 text-left">Employee Name</th>
                <th className="border p-2 text-left">Punch In</th>
                <th className="border p-2 text-left">Punch Out</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Photo</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="border p-2">{record.employeeId}</td>
                  <td className="border p-2">{record.employeeName || 'N/A'}</td>
                  <td className="border p-2">
                    {record.punchIn
                      ? new Date(record.punchIn.seconds * 1000).toLocaleTimeString()
                      : 'N/A'}
                  </td>
                  <td className="border p-2">
                    {record.punchOut
                      ? new Date(record.punchOut.seconds * 1000).toLocaleTimeString()
                      : 'N/A'}
                  </td>
                  <td className="border p-2">
                    {record.location
                      ? `Lat: ${record.location.latitude}, Lng: ${record.location.longitude}`
                      : 'N/A'}
                  </td>
                  <td className="border p-2">
                    {record.photo ? (
                      <img
                        src={record.photo}
                        alt="Employee"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      'No Photo'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
