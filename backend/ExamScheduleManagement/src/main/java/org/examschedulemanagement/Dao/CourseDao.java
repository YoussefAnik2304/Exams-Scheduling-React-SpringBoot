package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseDao extends JpaRepository<Course,Long> {
}
