package com.devanand.campus.eventmanagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.devanand.campus.eventmanagement.model.Student;

@Repository
public interface IStudentRepo extends CrudRepository<Student,Integer> {
}
