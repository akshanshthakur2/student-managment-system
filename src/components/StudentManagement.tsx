import React, { useState } from 'react';
import { Student } from '../types';
import { Plus, Trash2, UserPlus } from 'lucide-react';

interface StudentManagementProps {
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onRemoveStudent: (studentId: string) => void;
  students: Student[];
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  onAddStudent,
  onRemoveStudent,
  students,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent(newStudent);
    setNewStudent({ name: '', email: '', rollNumber: '' });
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Students</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          {isAdding ? (
            <>
              <span>Cancel</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Add Student</span>
            </>
          )}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              required
              value={newStudent.rollNumber}
              onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Student
          </button>
        </form>
      )}

      <div className="space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">
                Roll: {student.rollNumber} | {student.email}
              </p>
            </div>
            <button
              onClick={() => onRemoveStudent(student.id)}
              className="text-red-600 hover:text-red-700 p-1"
              title="Remove student"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};