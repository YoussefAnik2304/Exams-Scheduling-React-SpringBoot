package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeDao extends JpaRepository<Grade,Long > {
}
