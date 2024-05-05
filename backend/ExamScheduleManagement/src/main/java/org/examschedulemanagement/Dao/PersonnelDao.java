package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonnelDao extends JpaRepository<Personnel, Long> {


}
