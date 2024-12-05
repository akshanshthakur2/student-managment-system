import React from 'react';
import { Student } from '../types';
import { UserCircle } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  selectedStudentId?: string;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  onSelectStudent,
  selectedStudentId,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Students</h2>
      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedStudentId === student.id
                ? 'bg-blue-100 border-blue-300'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectStudent(student)}
          >
            <div className="flex items-center space-x-3">
              <UserCircle className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">Roll: {student.rollNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};