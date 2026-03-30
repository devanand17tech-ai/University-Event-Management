package com.devanand.campus.eventmanagement.controller;

import com.devanand.campus.eventmanagement.model.Department;
import com.devanand.campus.eventmanagement.model.Event;
import com.devanand.campus.eventmanagement.model.Student;
import com.devanand.campus.eventmanagement.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    @Autowired
    StudentService studentService;

    @PostMapping("students")
    public Student addAStudent(@Valid @RequestBody Student s){
        return studentService.addAStudent(s);
    }
    @PostMapping("students/bulk")
    public String addStudents(@RequestBody List<Student> s){
        return studentService.addStudents(s);
    }
    @GetMapping("students")
    public Iterable<Student> getAllStudents(){
        return studentService.getAllStudents();
    }
    @GetMapping("students/{id}")
    public Optional<Student> getStudentById(@PathVariable Integer id){
        return studentService.getStudentById(id);
    }
    @PutMapping("students/{id}/{department}")
    public String updateStudentDepartment(@PathVariable Integer id, @PathVariable Department department){
        return studentService.updateStudentDepartment(id, department);
    }
    @DeleteMapping("students/{id}")
    public String removeStudentById(@PathVariable Integer id){
        return studentService.removeStudentById(id);
    }

    @GetMapping("students/{id}/events")
    public List<Event> getStudentEvents(@PathVariable Integer id){
        return studentService.getStudentEvents(id);
    }
}

/*
Add student
update student department
delete student
Get all students
Get student by ID
 */

