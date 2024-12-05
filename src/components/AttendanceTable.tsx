import React from 'react';
import { AttendanceRecord } from '../types';
import { formatDate } from '../utils/dateUtils';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const StatusIcon = ({ status }: { status: AttendanceRecord['status'] }) => {
  switch (status) {
    case 'present':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'absent':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'late':
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRecords.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <StatusIcon status={record.status} />
                  <span className="capitalize">{record.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {record.notes || '-'}
              </td>
            </tr>
          ))}
          {sortedRecords.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};