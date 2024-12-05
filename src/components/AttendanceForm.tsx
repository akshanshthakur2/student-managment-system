import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../types';
import { DateSelector } from './DateSelector';
import { getCurrentDate } from '../utils/dateUtils';

interface AttendanceFormProps {
  student: Student;
  onSubmit: (record: Omit<AttendanceRecord, 'id'>) => void;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({ student, onSubmit }) => {
  const [date, setDate] = useState(getCurrentDate());
  const [status, setStatus] = useState<AttendanceRecord['status']>('present');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      studentId: student.id,
      date,
      status,
      notes: notes.trim() || undefined,
    });
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <DateSelector selectedDate={date} onDateChange={setDate} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as AttendanceRecord['status'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Optional notes..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Mark Attendance
      </button>
    </form>
  );
};