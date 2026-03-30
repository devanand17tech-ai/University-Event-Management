import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import { Plus, Edit, Trash2, Loader2, Save, X, Calendar, MapPin, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddMode, setIsAddMode] = useState(false);
    const [newEvent, setNewEvent] = useState({
        eventName: '',
        description: '',
        locationOfEvent: '',
        eventDate: '',
        startTime: '10:00:00',
        endTime: '12:00:00',
        capacity: 100
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await eventService.getAllEvents();
            setEvents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Failed to load events for admin.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await eventService.addEvent(newEvent);
            toast.success('Event successfully created!');
            setIsAddMode(false);
            setNewEvent({
                eventName: '',
                description: '',
                locationOfEvent: '',
                eventDate: '',
                startTime: '10:00:00',
                endTime: '12:00:00',
                capacity: 100
            });
            fetchEvents();
        } catch (error) {
            toast.error('Error creating event.');
        }
    };

    const handleUpdateLocation = async (id) => {
        const newLocation = window.prompt('Enter new location:');
        if (!newLocation) return;
        try {
            await eventService.updateEventLocation(id, newLocation);
            toast.success('Location updated!');
            fetchEvents();
        } catch (error) {
            toast.error('Error updating location.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await eventService.deleteEvent(id);
            toast.success('Event deleted.');
            fetchEvents();
        } catch (error) {
            toast.error('Error deleting event.');
        }
    };

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [eventStudents, setEventStudents] = useState([]);
    const [viewingStudents, setViewingStudents] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const handleViewStudents = async (eventId) => {
        setViewingStudents(true);
        setSelectedEventId(eventId);
        setLoadingStudents(true);
        try {
            const response = await eventService.getEventStudents(eventId);
            setEventStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Failed to load student list.');
        } finally {
            setLoadingStudents(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            {/* Header and Other Sections ... */}
            
            {/* Registered Students Modal */}
            {viewingStudents && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Registered Students</h3>
                                <p className="text-sm text-slate-500 font-medium">Batch 2026 • Campus Portal</p>
                            </div>
                            <button onClick={() => setViewingStudents(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                <X className="h-6 w-6 text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto p-8">
                            {loadingStudents ? (
                                <div className="py-20 text-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
                                    <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Fetching attendee list...</p>
                                </div>
                            ) : eventStudents.length === 0 ? (
                                <div className="py-20 text-center">
                                    <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-8 w-8 text-slate-300" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No students registered for this event yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {eventStudents.map(student => (
                                        <div key={student.studentId} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                                                    {student.firstName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{student.firstName} {student.lastName}</div>
                                                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{student.studentDepartment} • ID: {student.studentId}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                                                Age: {student.age}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-right">
                             <button onClick={() => setViewingStudents(false)} className="btn-secondary">Close List</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-12">
            {/* Same Header Content ... */}
            <div className="text-left">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor all campus events.</p>
                </div>
                {!isAddMode && (
                    <button onClick={() => setIsAddMode(true)} className="btn-primary space-x-2 px-6 py-3 shadow-lg shadow-blue-100">
                        <Plus className="h-5 w-5" />
                        <span>Create New Event</span>
                    </button>
                )}
            </div>

            {isAddMode && (
                <div className="mb-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900">Event Details</h2>
                        <button onClick={() => setIsAddMode(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleAddEvent} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Event Name</label>
                                <input 
                                    type="text" required 
                                    className="input-field"
                                    value={newEvent.eventName}
                                    onChange={e => setNewEvent({...newEvent, eventName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea 
                                    className="input-field h-32 py-3" required
                                    value={newEvent.description}
                                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                <input 
                                    type="text" required
                                    className="input-field"
                                    value={newEvent.locationOfEvent}
                                    onChange={e => setNewEvent({...newEvent, locationOfEvent: e.target.value})}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                                    <input 
                                        type="date" required 
                                        className="input-field"
                                        value={newEvent.eventDate}
                                        onChange={e => setNewEvent({...newEvent, eventDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Capacity</label>
                                    <input 
                                        type="number" required 
                                        className="input-field"
                                        value={newEvent.capacity}
                                        onChange={e => setNewEvent({...newEvent, capacity: parseInt(e.target.value)})}
                                    />
                                </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
                                    <input 
                                        type="time" required step="1"
                                        className="input-field"
                                        value={newEvent.startTime}
                                        onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">End Time</label>
                                    <input 
                                        type="time" required step="1"
                                        className="input-field"
                                        value={newEvent.endTime}
                                        onChange={e => setNewEvent({...newEvent, endTime: e.target.value})}
                                    />
                                </div>
                           </div>
                           <div className="pt-4 flex space-x-4">
                                <button type="submit" className="btn-primary flex-1 py-4">
                                    <Save className="h-5 w-5 mr-2" />
                                    Publish Event
                                </button>
                                <button type="button" onClick={() => setIsAddMode(false)} className="btn-secondary px-8">
                                    Cancel
                                </button>
                           </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-widest">Event</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-widest">Details</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-widest text-center">Status</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-8 py-12 text-center text-slate-400">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                                    <span>Syncing dashboard...</span>
                                </td>
                            </tr>
                        ) : events.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-8 py-12 text-center text-slate-400">
                                    No events listed yet.
                                </td>
                            </tr>
                        ) : (
                            events.map(event => (
                                <tr key={event.eventId} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.eventName}</div>
                                        <div className="text-xs text-slate-500 font-medium truncate max-w-[200px] mt-1">{event.description}</div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center text-sm text-slate-600 space-x-2">
                                            <Calendar className="h-3 w-3 text-blue-500" />
                                            <span>{event.eventDate}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-slate-600 space-x-2 mt-1">
                                            <MapPin className="h-3 w-3 text-blue-500" />
                                            <span>{event.locationOfEvent}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                         <button 
                                            onClick={() => handleViewStudents(event.eventId)}
                                            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold ring-1 ring-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                         >
                                            <Users className="h-3 w-3" />
                                            <span>View Students</span>
                                         </button>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleUpdateLocation(event.eventId)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm transition-all"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(event.eventId)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm transition-all"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
