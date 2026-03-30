import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar as CalendarIcon, Users, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EventCard = ({ event }) => {
  const { isAdmin } = useAuth();
  const { eventId, eventName, description, locationOfEvent, eventDate, startTime, capacity } = event;

  return (
    <div className="card h-full flex flex-col group">
      <Link to={`/events/${eventId}`} className="block h-48 relative bg-blue-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-blue-300">
           <CalendarIcon className="h-16 w-16 opacity-30 group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
           {eventDate}
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <Link to={`/events/${eventId}`}>
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-400 transition-colors">
            {eventName}
            </h3>
        </Link>
        <p className="mt-2 text-slate-500 text-sm line-clamp-2">{description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-slate-600 text-sm space-x-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="truncate">{locationOfEvent}</span>
          </div>
          <div className="flex items-center text-slate-600 text-sm space-x-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{startTime}</span>
          </div>
          <div className="flex items-center text-slate-600 text-sm space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>Max Capacity: {capacity}</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
          <Link 
            to={`/events/${eventId}`} 
            className="flex items-center space-x-1 text-blue-600 font-semibold hover:text-blue-700 text-sm"
          >
            <span>View Details</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
          {!isAdmin && (
            <Link to={`/events/${eventId}`} className="btn-primary py-1.5 px-4 text-sm font-semibold">
                Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
