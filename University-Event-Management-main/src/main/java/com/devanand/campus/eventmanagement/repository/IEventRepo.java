package com.devanand.campus.eventmanagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.devanand.campus.eventmanagement.model.Event;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IEventRepo extends CrudRepository<Event, Integer> {

    List<Event> findByEventDate(LocalDate eventDate);

}