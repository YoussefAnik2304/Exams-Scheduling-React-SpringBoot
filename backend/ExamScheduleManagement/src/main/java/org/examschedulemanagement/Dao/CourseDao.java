package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseDao extends JpaRepository<Course,Long> {

//    List<Course> findBySupervisor_Name(String supervisorName);
//    List<Course> findByGrade_Name(String gradeName);
//    List<Course> findByTeacher_Name(String teacherName);

}
