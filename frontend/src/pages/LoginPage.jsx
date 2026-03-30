import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService } from '../services/api';
import { LogIn, User, ShieldCheck, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isAdminMode) {
        // Mock Admin Login
        if (studentId === 'admin') {
           login({ studentId: 0, firstName: 'System', lastName: 'Admin', role: 'ADMIN' });
           toast.success('Admin access granted');
           navigate('/admin');
        } else {
           toast.error('Invalid admin credentials');
        }
      } else {
        // Student Login by ID
        const response = await studentService.getStudentById(studentId);
        if (response.data) {
          login({ ...response.data, role: 'STUDENT' });
          toast.success(`Welcome back, ${response.data.firstName}!`);
          navigate('/events');
        } else {
          toast.error('Student ID not found.');
        }
      }
    } catch (error) {
      toast.error('Login failed. Check your ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 mb-6">
            <LogIn className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Portal Access</h2>
          <p className="mt-3 text-slate-500 font-medium leading-relaxed">
            {isAdminMode ? 'Authorized administrative access only.' : 'Manage your campus journey.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                {isAdminMode ? 'Admin Username' : 'Student ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isAdminMode ? <ShieldCheck className="h-5 w-5 text-slate-400" /> : <User className="h-5 w-5 text-slate-400" />}
                </div>
                <input
                  type="text"
                  required
                  className="input-field pl-10 h-12"
                  placeholder={isAdminMode ? "admin" : "Enter your ID (e.g. 1)"}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            </div>
            
            {isAdminMode && (
                <div className="relative">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input type="password" placeholder="••••••••" className="input-field pl-10 h-12" defaultValue="admin" />
                    </div>
                </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full btn-primary h-14 text-lg"
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col space-y-4">
            <button 
              onClick={() => { setIsAdminMode(!isAdminMode); setStudentId(''); }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-2"
            >
              {isAdminMode ? <User className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <span>{isAdminMode ? 'Return to Student Login' : 'Admin Portal'}</span>
            </button>
            <p className="text-center text-sm text-slate-500">
              New here? <Link to="/register" className="font-bold text-slate-900 hover:underline transition-all">Create an account</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
