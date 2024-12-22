import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, doc, updateDoc, getDocs, query, where, setDoc, getDoc } from 'firebase/firestore';
import { ClipboardCheck } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const useRegularisationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const regularisationRef = collection(db, 'regularisation_requests');
        const querySnapshot = await getDocs(regularisationRef);

        const fetchedRequests = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate ? data.date.toDate() : new Date(data.date.seconds * 1000),
            loginTime: data.loginTime?.toDate ? data.loginTime.toDate() : new Date(data.loginTime.seconds * 1000),
            logoutTime: data.logoutTime?.toDate ? data.logoutTime.toDate() : new Date(data.logoutTime.seconds * 1000),
            employeeId: data.employeeId || 'Unknown',
            employeeName: data.employeeName || 'Unknown Employee',
            status: data.status || 'pending', // Default to 'pending'
          };
        });

        setRequests(fetchedRequests);
      } catch (error) {
        console.error('Error fetching regularisation requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const updateAttendance = async (employeeId, date, loginTime, logoutTime) => {
    try {
      const attendanceRef = collection(db, 'attendance');
      
      // Convert the date to just the date part for comparison
      const dateOnly = new Date(date.toDate().setHours(0, 0, 0, 0));
      
      const attendanceQuery = query(
        attendanceRef,
        where('employeeId', '==', employeeId)
      );
  
      const attendanceSnapshot = await getDocs(attendanceQuery);
  
      let found = false;
  
      attendanceSnapshot.forEach((doc) => {
        const attendanceDate = new Date(doc.data().date.toDate().setHours(0, 0, 0, 0));
        if (attendanceDate.getTime() === dateOnly.getTime()) {
          // Update the matching document
          found = true;
          updateDoc(doc.ref, {
            punchIn: loginTime,
            punchOut: logoutTime,
            isRegularized: true,
          });
        }
      });
  
      if (!found) {
        toast.error('No matching attendance record found for the employee and date.');
      } else {
        toast.success('Attendance updated successfully.');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      toast.error('Failed to update attendance.');
    }
  };
  

  const handleApprove = async (id) => {
    try {
      const requestRef = doc(db, 'regularisation_requests', id);
      const requestSnapshot = await getDoc(requestRef);
      const requestData = requestSnapshot.data();
  
      if (!requestData) {
        toast.error('Request data not found.');
        return;
      }
  
      const { employeeId, date, loginTime, logoutTime } = requestData;
  
      // Update the regularisation request status to approved
      await updateDoc(requestRef, { status: 'approved' });
  
      // Update the corresponding attendance record
      await updateAttendance(employeeId, date, loginTime, logoutTime);
  
      // Update the state to reflect the approved request
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: 'approved' } : req
        )
      );
  
      toast.success('Request approved and attendance updated successfully.');
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request.');
    }
  };
  
  const handleReject = async (id) => {
    try {
      const requestRef = doc(db, 'regularisation_requests', id);
      await updateDoc(requestRef, { status: 'rejected' });

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: 'rejected' } : req
        )
      );
      toast.success('Request rejected successfully.');
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request.');
    }
  };

  return { requests, handleApprove, handleReject };
};

export default function RegularisationRequests() {
  const { requests, handleApprove, handleReject } = useRegularisationRequests();

  return (
    <div className="card p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <ClipboardCheck /> Regularisation Requests
      </h2>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-600 text-sm">No regularisation requests available.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="card p-4 bg-gray-50 shadow-md rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">{request.employeeName}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : request.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Employee ID:</strong> {request.employeeId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {format(request.date, 'dd MMM yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {format(request.loginTime, 'HH:mm')} - {format(request.logoutTime, 'HH:mm')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Reason:</strong> {request.reason}
                </p>
                {request.status === 'pending' && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
