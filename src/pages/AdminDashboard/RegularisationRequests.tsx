import React from 'react';
import { useRegularisationRequests } from '../../hooks/useRegularisationRequests';
import { ClipboardCheck } from 'lucide-react';
import { format } from 'date-fns';

export default function RegularisationRequests() {
  const { requests, handleApprove, handleReject } = useRegularisationRequests();

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ClipboardCheck /> Regularisation Requests
      </h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="card bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-bold">{request.employeeName}</h3>
                <span className="text-sm bg-yellow-200 px-2 py-1 rounded">
                  {request.status}
                </span>
              </div>
              <p className="text-sm">
                Date: {format(request.date, 'dd MMM yyyy')}
              </p>
              <p className="text-sm">
                Time: {format(request.loginTime, 'HH:mm')} -{' '}
                {format(request.logoutTime, 'HH:mm')}
              </p>
              <p className="text-sm">Reason: {request.reason}</p>
              {request.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="btn-primary flex-1 py-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="btn-secondary flex-1 py-2"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}