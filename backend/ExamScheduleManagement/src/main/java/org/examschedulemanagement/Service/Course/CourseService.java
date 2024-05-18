package org.examschedulemanagement.Service.Course;

import org.examschedulemanagement.Entities.Course;

import java.util.List;

public interface CourseService {

    List<Course> getAllCourses();
    Course getCourseById(Long id );
    Course addCourse(Course course);
    Course updateCourse(Long id ,Course course);
    Course deleteCourse(Course course);

}
