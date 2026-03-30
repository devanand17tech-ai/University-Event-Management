import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentService, eventService } from '../services/api';
import { Calendar, MapPin, Clock, Trash2, ArrowRight, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    if (!user?.studentId) return;
    try {
      setLoading(true);
      const response = await studentService.getStudentEvents(user.studentId);
      setEvents(response.data || []);
    } catch (error) {
      toast.error('Failed to load your events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const handleUnregister = async (eventId) => {
    if (!window.confirm('Are you sure you want to unregister from this event?')) return;
    
    try {
      await eventService.unregisterFromEvent(eventId, user.studentId);
      toast.success('Successfully unregistered');
      fetchMyEvents(); // Refresh list
    } catch (error) {
      toast.error('Failed to unregister');
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
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-4 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Personal Dashboard</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Joined Events</h1>
          <p className="mt-3 text-slate-500 font-medium text-lg">Manage all the activities you're participating in.</p>
        </div>
        <Link to="/events" className="btn-secondary flex items-center space-x-2">
          <span>Find More Events</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.eventId} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <button 
                    onClick={() => handleUnregister(event.eventId)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Unregister"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">
                  {event.eventName}
                </h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-slate-500 text-sm font-medium">
                    <MapPin className="h-4 w-4 mr-2 text-slate-300" />
                    <span>{event.locationOfEvent}</span>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm font-medium">
                    <Clock className="h-4 w-4 mr-2 text-slate-300" />
                    <span>{event.eventDate} • {event.startTime}</span>
                  </div>
                </div>

                <Link 
                  to={`/events/${event.eventId}`}
                  className="w-full py-4 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
                >
                  View Details
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-300 rounded-[32px] p-20 text-center max-w-2xl mx-auto">
          <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 mx-auto mb-8">
            <Calendar className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">No events found</h3>
          <p className="text-slate-500 font-medium mb-10 text-lg leading-relaxed">
            You haven't joined any events yet. Explore the campus and discover your next big opportunity!
          </p>
          <Link to="/events" className="btn-primary px-10 py-4 inline-flex items-center space-x-3 text-lg">
            <span>Discover Events</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
