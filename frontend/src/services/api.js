import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventService = {
  getAllEvents: () => api.get('/events'),
  getEventById: (id) => api.get(`/events/${id}`),
  addEvent: (event) => api.post('/events', event),
  updateEventLocation: (id, location) => api.put(`/events/${id}/location/${location}`),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  registerForEvent: (eventId, studentId) => api.post(`/events/register/${eventId}/${studentId}`),
  unregisterFromEvent: (eventId, studentId) => api.delete(`/events/unregister/${eventId}/${studentId}`),
  getEventsByDate: (date) => api.get(`/events/date?date=${date}`),
  getEventStudents: (eventId) => api.get(`/events/${eventId}/students`),
};

export const studentService = {
  getAllStudents: () => api.get('/students'),
  getStudentById: (id) => api.get(`/students/${id}`),
  addStudent: (student) => api.post('/students', student),
  updateStudentDepartment: (id, department) => api.put(`/students/${id}/${department}`),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  getStudentEvents: (id) => api.get(`/students/${id}/events`),
};

export default api;
