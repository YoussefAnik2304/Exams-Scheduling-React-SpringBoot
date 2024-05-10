package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamDao extends JpaRepository<Exam,Long> {
}
