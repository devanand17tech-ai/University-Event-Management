import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';
import EventCard from '../components/EventCard';
import { Search, Filter, Calendar, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getAllEvents();
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error('Failed to load events. Please try again later.');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
      if (!selectedDate) {
          fetchEvents();
          return;
      }
      try {
          setLoading(true);
          const response = await eventService.getEventsByDate(selectedDate);
          setEvents(Array.isArray(response.data) ? response.data : []);
          toast.success(`Showing events for ${selectedDate}`);
      } catch (error) {
          toast.error('Could not filter by date.');
      } finally {
          setLoading(false);
      }
  }

  const filteredEvents = events.filter(event => 
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.locationOfEvent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Upcoming Events</h1>
          <p className="text-slate-600">Discover and join the latest campus activities.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search event name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field w-auto"
              />
              <button onClick={handleFilter} className="btn-secondary px-4">
                <Filter className="h-5 w-5" />
              </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Fetching the latest events...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <Info className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No events found</h3>
          <p className="text-slate-500 mb-8 max-w-sm text-center">
            We couldn't find any events matching your search or filters. Try adjusting your criteria.
          </p>
          <button 
            onClick={() => {setSearchTerm(''); setSelectedDate(''); fetchEvents();}} 
            className="btn-primary"
          >
            Show All Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
