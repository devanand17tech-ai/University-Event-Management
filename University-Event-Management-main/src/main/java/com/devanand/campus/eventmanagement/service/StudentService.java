package com.devanand.campus.eventmanagement.service;

import com.devanand.campus.eventmanagement.model.Department;
import com.devanand.campus.eventmanagement.model.Event;
import com.devanand.campus.eventmanagement.model.Student;
import com.devanand.campus.eventmanagement.repository.IStudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    IStudentRepo studentRepo;

    public Student addAStudent(Student s){
        return studentRepo.save(s);
    }

    public String addStudents(List<Student> s){
        studentRepo.saveAll(s);
        return "List of students are added !!!";
    }

    public Iterable<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    public Optional<Student> getStudentById(Integer id){
        return studentRepo.findById(id);
    }

    public  String updateStudentDepartment(Integer id, Department department){
        Optional<Student> s = studentRepo.findById(id);

        if(s.isEmpty()){
            return "Student Id not found !!!";
        }

        Student stu = s.get();
        stu.setStudentDepartment(department);
        studentRepo.save(stu);
        return "Student's Department is Updated !!!";
    }

    public String removeStudentById(Integer id){

        Student stu = studentRepo.findById(id).orElse(null);

        if(stu==null){
            return "Student's Id not found";
        }

        studentRepo.delete(stu);

        return "Student is Removed";
    }

    public List<Event> getStudentEvents(Integer id) {
        Student s = studentRepo.findById(id).orElse(null);
        if (s != null) {
            return s.getEvents();
        }
        return null;
    }

}
