import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, studentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Clock, Users, ArrowLeft, Loader2, CheckCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const eventRes = await eventService.getEventById(id);
        setEvent(eventRes.data);

        // Check registration status
        if (user?.studentId) {
            try {
                const studentEventsRes = await studentService.getStudentEvents(user.studentId);
                const registered = studentEventsRes.data?.some(e => e.eventId === parseInt(id));
                setIsRegistered(registered);
            } catch (err) {
                console.error("Could not fetch student events", err);
            }
        }
      } catch (error) {
        toast.error('Event not found.');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please login to register for events');
      navigate('/login');
      return;
    }
    setRegistering(true);
    try {
      await eventService.registerForEvent(id, user.studentId);
      toast.success('Successfully registered!');
      setIsRegistered(true);
    } catch (error) {
      toast.error('Registration failed.');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!user) return;
    setRegistering(true);
    try {
      await eventService.unregisterFromEvent(id, user.studentId);
      toast.success('Successfully unregistered.');
      setIsRegistered(false);
    } catch (error) {
      toast.error('Unregistration failed.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-500 hover:text-blue-600 font-semibold mb-8 transition-colors group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Events</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <div className="relative h-96 bg-blue-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-blue-200">
                    <Calendar className="h-32 w-32 opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/60 to-transparent">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{event.eventName}</h1>
                    <div className="flex items-center text-white/90 space-x-4 font-medium">
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {event.locationOfEvent}</span>
                        <span className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {event.eventDate}</span>
                    </div>
                </div>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">About the Event</h2>
                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                    {event.description}
                </p>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Event Schedule</h4>
                        <div className="flex items-start space-x-4">
                            <Clock className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <p className="font-bold text-slate-900">{event.startTime} - {event.endTime}</p>
                                <p className="text-sm text-slate-500">{event.eventDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Capacity Info</h4>
                        <div className="flex items-start space-x-4">
                            <Users className="h-6 w-6 text-blue-600 mt-1" />
                            <div>
                                <p className="font-bold text-slate-900">{event.capacity} total seats</p>
                                <p className="text-sm text-slate-500">Waitlist options available</p>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>

        {!isAdmin && (
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
                        <div className="mb-8">
                            <div className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Free Registration</div>
                            <p className="text-sm text-slate-500 font-medium italic">Exclusive to registered campus students.</p>
                        </div>
                        
                        <button 
                            onClick={isRegistered ? handleUnregister : handleRegister}
                            disabled={registering}
                            className={`w-full h-14 text-lg mb-6 shadow-lg transition-all rounded-2xl font-bold flex items-center justify-center ${
                                isRegistered 
                                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                                : 'btn-primary shadow-blue-100'
                            }`}
                        >
                            {registering ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : isRegistered ? (
                                'Unregister from Event'
                            ) : (
                                'Register Now'
                            )}
                        </button>
                        
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <div className="flex items-start space-x-3 text-sm">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-slate-600 leading-snug">Instant confirmation via portal.</span>
                            </div>
                            <div className="flex items-start space-x-3 text-sm">
                                <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                <span className="text-slate-600 leading-snug">Digital pass will be generated upon entry.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
