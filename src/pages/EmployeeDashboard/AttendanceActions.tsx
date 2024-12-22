import React, { useState, useRef } from 'react';
import { Clock, LogOut } from 'lucide-react';
import Webcam from 'react-webcam';
import { useAuth } from '../../context/AuthContext';
import { markAttendance } from '../../services/attendanceService';
import toast from 'react-hot-toast';

export default function AttendanceActions() {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { user } = useAuth();

  const handlePunchIn = async () => {
    try {
      const photo = webcamRef.current?.getScreenshot();
      const position = await getCurrentPosition();
      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip);

      await markAttendance(user.uid, {
        photo,
        location: position,
        ipAddress,
        type: 'in'
      });

      toast.success('Punched in successfully!');
      setShowCamera(false);
    } catch (error) {
      toast.error('Failed to punch in');
    }
  };

  const handlePunchOut = async () => {
    const now = new Date();
    const minTime = new Date();
    minTime.setHours(18, 30, 0);

    if (now < minTime) {
      toast.error('Cannot punch out before 6:30 PM');
      return;
    }

    try {
      await markAttendance(user.uid, { type: 'out' });
      toast.success('Punched out successfully!');
    } catch (error) {
      toast.error('Failed to punch out');
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Attendance Actions</h2>
      <div className="space-y-4">
        {showCamera ? (
          <div className="space-y-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg border-2 border-dark"
            />
            <div className="flex gap-4">
              <button onClick={handlePunchIn} className="btn-primary flex-1">
                Confirm Punch In
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowCamera(true)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Clock /> Punch In
            </button>
            <button
              onClick={handlePunchOut}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <LogOut /> Punch Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}