import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const useEmployeeInfo = (userId: string) => {
  const [employeeInfo, setEmployeeInfo] = useState<any>(null);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch employee info
      const employeeRef = collection(db, 'employees');
      const q = query(employeeRef, where('uid', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setEmployeeInfo(querySnapshot.docs[0].data());
      }

      // Fetch today's attendance
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const attendanceRef = collection(db, 'attendance');
      const attendanceQuery = query(
        attendanceRef,
        where('employeeId', '==', userId),
        where('date', '>=', today)
      );
      
      const attendanceSnapshot = await getDocs(attendanceQuery);
      
      if (!attendanceSnapshot.empty) {
        setTodayAttendance(attendanceSnapshot.docs[0].data());
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return { employeeInfo, todayAttendance };
};