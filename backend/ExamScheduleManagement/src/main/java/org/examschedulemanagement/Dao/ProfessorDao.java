package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorDao extends JpaRepository<Professor,Long> {
    Professor getProfessorByEmail(String email);
}
