import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useAttendanceStats = () => {
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    incomplete: 0,
    late: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      const attendanceRef = collection(db, 'attendance');
      const q = query(attendanceRef, where('employeeId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      let present = 0;
      let incomplete = 0;
      let late = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.punchOut) present++;
        if (!data.punchOut) incomplete++;
        if (new Date(data.punchIn.toDate()).getHours() >= 9 &&
            new Date(data.punchIn.toDate()).getMinutes() > 30) {
          late++;
        }
      });

      setStats({
        present,
        absent: 30 - present - incomplete, // Assuming 30 working days
        incomplete,
        late
      });
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  return { stats };
};