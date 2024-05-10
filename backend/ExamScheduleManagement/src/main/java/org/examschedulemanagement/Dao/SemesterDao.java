package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterDao extends JpaRepository<Semester,Long> {
}
