import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore';

export const markAttendance = async (employeeId: string, data: any) => {
  const attendanceRef = collection(db, 'attendance');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const q = query(
    attendanceRef,
    where('employeeId', '==', employeeId),
    where('date', '>=', today)
  );

  const querySnapshot = await getDocs(q);

  if (data.type === 'in') {
    if (!querySnapshot.empty) {
      throw new Error('Already punched in today');
    }

    return addDoc(attendanceRef, {
      employeeId,
      date: Timestamp.fromDate(today),
      punchIn: Timestamp.now(),
      punchOut: null,
      photo: data.photo,
      ipAddress: data.ipAddress,
      location: data.location
    });
  } else {
    if (querySnapshot.empty) {
      throw new Error('No punch in record found for today');
    }

    const attendanceDoc = querySnapshot.docs[0];
    return updateDoc(doc(db, 'attendance', attendanceDoc.id), {
      punchOut: Timestamp.now()
    });
  }
};