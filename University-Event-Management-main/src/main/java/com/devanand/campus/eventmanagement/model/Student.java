package com.devanand.campus.eventmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;

    @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Only alphabets are allowed with the first letter as capital")
    private String firstName;

    @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Only alphabets are allowed with the first letter as capital")
    private String lastName;

    @Min(value = 18)
    @Max(value = 25)
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Department studentDepartment;

    // Student can register for multiple events
    @ManyToMany(mappedBy = "students")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("students")
    private List<Event> events = new java.util.ArrayList<>();

}