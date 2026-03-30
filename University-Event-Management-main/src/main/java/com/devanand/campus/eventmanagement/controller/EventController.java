package com.devanand.campus.eventmanagement.controller;

import com.devanand.campus.eventmanagement.model.Event;
import com.devanand.campus.eventmanagement.model.Student;
import com.devanand.campus.eventmanagement.service.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    EventService eventService;

    // Add single event
    @PostMapping
    public String addAEvent(@RequestBody Event e){
        return eventService.addAEvent(e);
    }

    // Add multiple events
    @PostMapping("/bulk")
    public String addEvents(@RequestBody List<Event> e){
        return eventService.addEvents(e);
    }

    // Get all events
    @GetMapping
    
    public Iterable<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    // Get event by ID
    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Integer id){
        return eventService.getEventById(id);
    }

    // Get events by date
    @GetMapping("/date")
    public Iterable<Event> getEventsOnSameDate(@RequestParam LocalDate date){
        return eventService.getEventsOnSameDate(date);
    }

    @GetMapping("/{id}/students")
    public List<Student> getStudentsByEvent(@PathVariable Integer id) {
        return eventService.getStudentsByEventId(id);
    }

    // Update location
    @PutMapping("/{id}/location/{loc}")
    public String updateEventLocationById(@PathVariable Integer id, @PathVariable String loc){
        return eventService.updateEventLocationById(id, loc);
    }

    // Delete event
    @DeleteMapping("/{id}")
    public String removeEventById(@PathVariable Integer id){
        return eventService.removeEventById(id);
    }
    @PostMapping("/register/{eventId}/{studentId}")
    public String registerStudentToEvent(@PathVariable Integer eventId,
                                         @PathVariable Integer studentId){
        return eventService.registerStudentToEvent(studentId, eventId);
    }
    @DeleteMapping("/unregister/{eventId}/{studentId}")
    public String unregisterStudent(@PathVariable Integer eventId,
                                    @PathVariable Integer studentId){
        return eventService.unregisterStudentFromEvent(studentId, eventId);
    }

}