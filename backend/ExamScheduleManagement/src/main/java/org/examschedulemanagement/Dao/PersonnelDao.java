package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonnelDao extends JpaRepository<Personnel,Long> {
    Optional<Personnel> getPersonnelByEmail(String email);
    Boolean existsByEmail(String email);
}
