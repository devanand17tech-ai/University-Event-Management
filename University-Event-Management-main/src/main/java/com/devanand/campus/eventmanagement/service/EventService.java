package com.devanand.campus.eventmanagement.service;

import com.devanand.campus.eventmanagement.model.Event;
import com.devanand.campus.eventmanagement.model.Student;
import com.devanand.campus.eventmanagement.repository.IEventRepo;
import com.devanand.campus.eventmanagement.repository.IStudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    IEventRepo eventRepo;

    @Autowired
    IStudentRepo studentRepo;

    // Add single event
    public String addAEvent(Event e){
        eventRepo.save(e);
        return "A new event is added !!!";
    }

    // Add multiple events
    public String addEvents(List<Event> e){
        eventRepo.saveAll(e);
        return "List of events are added !!!";
    }

    // Get all events
    public Iterable<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    // Get event by ID
    public Optional<Event> getEventById(Integer id){
        return eventRepo.findById(id);
    }

    // Get events by date
    public Iterable<Event> getEventsOnSameDate(LocalDate date){
        return eventRepo.findByEventDate(date);
    }

    // Update event location
    public String updateEventLocationById(Integer id, String loc){
        Optional<Event> s = eventRepo.findById(id);

        if(s.isEmpty()){
            return "Event not found !!!";
        }

        Event e = s.get();
        e.setLocationOfEvent(loc);
        eventRepo.save(e);

        return "Location updated for the provided event";
    }

    // Delete event
    public String removeEventById(Integer id){
        Event e = eventRepo.findById(id).orElse(null);

        if(e == null){
            return "Id not found";
        }

        eventRepo.delete(e);

        return "Event is removed !!!";
    }

    // Register student to event with capacity check
    @Transactional
    public String registerStudentToEvent(Integer studentId, Integer eventId){

        Optional<Student> studentOpt = studentRepo.findById(studentId);
        Optional<Event> eventOpt = eventRepo.findById(eventId);

        if(studentOpt.isEmpty() || eventOpt.isEmpty()){
            return "Student or Event not found";
        }

        Student student = studentOpt.get();
        Event event = eventOpt.get();

        // Check capacity
        if(event.getStudents().size() >= event.getCapacity()){
            return "Event is full. Registration closed.";
        }

        // Prevent duplicate registration
        if(student.getEvents().contains(event)){
            return "Student already registered for this event";
        }

        // Register student (Bi-directional update)
        student.getEvents().add(event);
        event.getStudents().add(student);
        
        studentRepo.save(student);
        eventRepo.save(event);

        return "Student successfully registered to event";
    }
    @Transactional
    public String unregisterStudentFromEvent(Integer studentId, Integer eventId){

        Optional<Student> studentOpt = studentRepo.findById(studentId);
        Optional<Event> eventOpt = eventRepo.findById(eventId);

        if(studentOpt.isEmpty() || eventOpt.isEmpty()){
            return "Student or Event not found";
        }

        Student student = studentOpt.get();
        Event event = eventOpt.get();

        if(!student.getEvents().contains(event)){
            return "Student is not registered for this event";
        }

        student.getEvents().remove(event);
        event.getStudents().remove(student);

        studentRepo.save(student);
        eventRepo.save(event);

        return "Student successfully unregistered from event";
    }

    @Transactional(readOnly = true)
    public List<Student> getStudentsByEventId(Integer id) {
        return eventRepo.findById(id).map(Event::getStudents).orElse(new java.util.ArrayList<>());
    }
}