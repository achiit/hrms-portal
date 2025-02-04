import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { Employee } from '../types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesRef = collection(db, 'employees');
        const q = query(employeesRef);
        const querySnapshot = await getDocs(q);
        
        const employeesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Employee[];

        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading };
};