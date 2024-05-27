package org.examschedulemanagement.Service.Course;

import org.examschedulemanagement.Entities.Course;

import java.util.List;

public interface CourseService {
    Course assignProfessorToCourse(Long courseId, Long professorId);
    Course assignSupervisorToCourse(Long courseId, Long supervisorId);

    List<Course> getAllCourses();
    Course getCourseById(Long id );
    Course addCourse(Course course);
    Course updateCourse(Long id ,Course course);
    Course deleteCourse(Course course);

//    List<Course> getCoursesByTeacherName(String teacherName);
//    List<Course> getCoursesBySupervisorName(String supervisorName);
//    List<Course> getCoursesByGrade(String gradeName);

}
