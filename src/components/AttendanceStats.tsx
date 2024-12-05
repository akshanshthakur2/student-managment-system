import React from 'react';
import { AttendanceStats } from '../types';
import { UserCheck, UserX, Clock } from 'lucide-react';

interface AttendanceStatsProps {
  stats: AttendanceStats;
}

export const AttendanceStatsDisplay: React.FC<AttendanceStatsProps> = ({ stats }) => {
  const presentPercentage = ((stats.presentDays / stats.totalDays) * 100).toFixed(1);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-green-600" />
          <span className="text-green-600 font-medium">Present</span>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.presentDays}</p>
        <p className="text-sm text-gray-500">Days</p>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <UserX className="w-5 h-5 text-red-600" />
          <span className="text-red-600 font-medium">Absent</span>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.absentDays}</p>
        <p className="text-sm text-gray-500">Days</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-600 font-medium">Late</span>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.lateDays}</p>
        <p className="text-sm text-gray-500">Days</p>
      </div>

      <div className="md:col-span-3 bg-blue-50 p-4 rounded-lg">
        <p className="text-lg font-medium">Attendance Rate</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${presentPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{presentPercentage}% Present</p>
      </div>
    </div>
  );
};