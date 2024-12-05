import React from 'react';
import { Student, AttendanceRecord } from '../types';
import { getLastNDays } from '../utils/dateUtils';
import { CheckCircle2, XCircle, Clock, Minus } from 'lucide-react';

interface DailyAttendanceOverviewProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
}

interface DailyStats {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export const DailyAttendanceOverview: React.FC<DailyAttendanceOverviewProps> = ({
  students,
  attendanceRecords,
}) => {
  const dates = getLastNDays(7); // Show last 7 days

  const getStudentStatus = (studentId: string, date: string): AttendanceRecord['status'] | null => {
    const record = attendanceRecords.find(
      (r) => r.studentId === studentId && r.date === date
    );
    return record?.status || null;
  };

  const getDailyStats = (date: string): DailyStats => {
    const dayRecords = attendanceRecords.filter((r) => r.date === date);
    return {
      present: dayRecords.filter((r) => r.status === 'present').length,
      absent: dayRecords.filter((r) => r.status === 'absent').length,
      late: dayRecords.filter((r) => r.status === 'late').length,
      total: students.length,
    };
  };

  const StatusIcon = ({ status }: { status: AttendanceRecord['status'] | null }) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'late':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-300" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Daily Attendance Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                {dates.map((date) => (
                  <th
                    key={date}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  {dates.map((date) => (
                    <td key={date} className="px-6 py-4 whitespace-nowrap">
                      <StatusIcon status={getStudentStatus(student.id, date)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Daily Summary
                </td>
                {dates.map((date) => {
                  const stats = getDailyStats(date);
                  return (
                    <td key={date} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{stats.present}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>{stats.absent}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span>{stats.late}</span>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};