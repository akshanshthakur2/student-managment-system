import React, { useState } from 'react';
import { Student, AttendanceRecord, AttendanceStats } from './types';
import { StudentList } from './components/StudentList';
import { AttendanceForm } from './components/AttendanceForm';
import { AttendanceStatsDisplay } from './components/AttendanceStats';
import { AttendanceTable } from './components/AttendanceTable';
import { DailyAttendanceOverview } from './components/DailyAttendanceOverview';
import { StudentManagement } from './components/StudentManagement';
import { ClipboardList } from 'lucide-react';

function App() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', rollNumber: 'A001' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', rollNumber: 'A002' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', rollNumber: 'A003' },
  ]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [showManagement, setShowManagement] = useState(false);

  const handleAttendanceSubmit = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: Date.now().toString(),
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
  };

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const student: Student = {
      ...newStudent,
      id: Date.now().toString(),
    };
    setStudents([...students, student]);
  };

  const handleRemoveStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
    setAttendanceRecords(attendanceRecords.filter((r) => r.studentId !== studentId));
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
  };

  const calculateStats = (studentId: string): AttendanceStats => {
    const studentRecords = attendanceRecords.filter(
      (record) => record.studentId === studentId
    );
    
    return {
      totalDays: studentRecords.length,
      presentDays: studentRecords.filter((r) => r.status === 'present').length,
      absentDays: studentRecords.filter((r) => r.status === 'absent').length,
      lateDays: studentRecords.filter((r) => r.status === 'late').length,
    };
  };

  const getStudentRecords = (studentId: string): AttendanceRecord[] => {
    return attendanceRecords.filter((record) => record.studentId === studentId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Attendance Management System
            </h1>
          </div>
          <button
            onClick={() => setShowManagement(!showManagement)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {showManagement ? 'View Attendance' : 'Manage Students'}
          </button>
        </div>

        {showManagement ? (
          <StudentManagement
            students={students}
            onAddStudent={handleAddStudent}
            onRemoveStudent={handleRemoveStudent}
          />
        ) : (
          <>
            <div className="mb-8">
              <DailyAttendanceOverview
                students={students}
                attendanceRecords={attendanceRecords}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <StudentList
                  students={students}
                  onSelectStudent={setSelectedStudent}
                  selectedStudentId={selectedStudent?.id}
                />
              </div>

              <div className="md:col-span-2">
                {selectedStudent ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Mark Attendance for {selectedStudent.name}
                      </h2>
                      <AttendanceForm
                        student={selectedStudent}
                        onSubmit={handleAttendanceSubmit}
                      />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-xl font-semibold mb-4">Attendance Statistics</h2>
                      <AttendanceStatsDisplay
                        stats={calculateStats(selectedStudent.id)}
                      />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
                      <AttendanceTable
                        records={getStudentRecords(selectedStudent.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-48">
                    <p className="text-gray-500 text-lg">
                      Select a student to mark attendance
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;