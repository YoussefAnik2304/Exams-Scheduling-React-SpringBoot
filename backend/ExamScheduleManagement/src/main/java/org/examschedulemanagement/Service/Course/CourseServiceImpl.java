package org.examschedulemanagement.Service.Course;

import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.CourseDao;
import org.examschedulemanagement.Entities.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;

    @Override
    public List<Course> getAllCourses() {
        return courseDao.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        Optional<Course> course = courseDao.findById(id);
        return course.orElse(null);
    }

    @Override
    public Course addCourse(Course course) {
        return courseDao.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course course) {
        if (courseDao.existsById(id)) {
            course.setId(id);
            return courseDao.save(course);
        }
        return null;
    }

    @Override
    public Course deleteCourse(Course course) {
        if (courseDao.existsById(course.getId())) {
            courseDao.delete(course);
            return course;
        }
        return null;
    }
}

