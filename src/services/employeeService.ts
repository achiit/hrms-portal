import { db, auth } from '../lib/firebase';
import { collection, doc, getDoc, addDoc, createUserWithEmailAndPassword } from 'firebase/firestore';

export const createEmployee = async (data: {
  name: string;
  email: string;
  employeeCode: string;
  password: string;
}) => {
  // Create authentication account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  // Create employee document
  await addDoc(collection(db, 'employees'), {
    uid: userCredential.user.uid,
    name: data.name,
    email: data.email,
    employeeCode: data.employeeCode,
    absentCount: 0,
    regulariseCount: 0,
    lateCount: 0
  });
};

export const fetchEmployeeData = async (employeeId: string) => {
  try {
    const employeeRef = doc(db, 'employees', employeeId);
    const employeeDoc = await getDoc(employeeRef);
    
    if (employeeDoc.exists()) {
      return {
        id: employeeDoc.id,
        ...employeeDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return null;
  }
};