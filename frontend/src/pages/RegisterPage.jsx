import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentService } from '../services/api';
import { UserPlus, User, Loader2, ArrowRight, ShieldCheck, Mail, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    age: 18,
    studentDepartment: 'CSE'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const departments = ['ME', 'ECE', 'CIVIL', 'CSE'];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await studentService.addStudent(student);
      const newStudentId = response.data.studentId;
      toast.success(`Registration successful! Your Student ID is: ${newStudentId}`, {
        duration: 10000, // Show for 10 seconds so they can note it down
      });
      navigate('/login');
    } catch (error) {
      if (error.response?.data && typeof error.response.data === 'object' && !error.response.data.message) {
        // Validation errors map
        Object.values(error.response.data).forEach(msg => toast.error(msg));
      } else {
        toast.error(error.response?.data?.message || error.response?.data || 'Registration failed. Check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 mb-6 font-bold text-2xl">
            <UserPlus className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Profile</h2>
          <p className="mt-3 text-slate-500 font-medium">Join 500+ campus members in the next big event.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <div className="relative">
                 <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                 <input
                   type="text" required placeholder="John"
                   className="input-field pl-10 h-12"
                   value={student.firstName}
                   onChange={e => setStudent({...student, firstName: e.target.value})}
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <div className="relative">
                 <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                 <input
                   type="text" required placeholder="Doe"
                   className="input-field pl-10 h-12"
                   value={student.lastName}
                   onChange={e => setStudent({...student, lastName: e.target.value})}
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Age</label>
              <input
                type="number" min="18" max="25" required
                className="input-field h-12"
                value={student.age}
                onChange={e => setStudent({...student, age: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Department</label>
              <div className="relative">
                 <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                 <select
                   className="input-field pl-10 h-12 appearance-none bg-white"
                   value={student.studentDepartment}
                   onChange={e => setStudent({...student, studentDepartment: e.target.value})}
                 >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept === 'ME' ? 'Mechanical Engineering' : 
                         dept === 'ECE' ? 'Electronics & Communication' : 
                         dept === 'CIVIL' ? 'Civil Engineering' : 
                         dept === 'CSE' ? 'Computer Science' : dept}
                      </option>
                    ))}
                 </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
             <button
                type="submit"
                disabled={loading}
                className="group relative w-full btn-primary h-14 text-lg"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Already have a profile? <Link to="/login" className="text-slate-900 font-bold hover:underline transition-all">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
