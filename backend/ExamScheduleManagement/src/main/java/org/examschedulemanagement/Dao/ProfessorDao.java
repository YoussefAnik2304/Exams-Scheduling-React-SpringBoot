package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorDao extends JpaRepository<Professor,Long> {
}
