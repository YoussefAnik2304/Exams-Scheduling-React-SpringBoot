package org.examschedulemanagement.Service.Course;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.CourseDao;
import org.examschedulemanagement.Dao.ProfessorDao;
import org.examschedulemanagement.Entities.Course;
import org.examschedulemanagement.Entities.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseDao courseDao;
    @Autowired
    private ProfessorDao professorDao;

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

    @Override
    public Course assignProfessorToCourse(Long courseId, Long professorId) {
        Course course = courseDao.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found with id " + courseId));
        Professor professor = professorDao.findById(professorId).orElseThrow(() -> new EntityNotFoundException("Professor not found with id " + professorId));

        course.setTeacher(professor);
        return courseDao.save(course);
    }

    @Override
    public Course assignSupervisorToCourse(Long courseId, Long supervisorId) {
        Course course = courseDao.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found with id " + courseId));
        Professor supervisor = professorDao.findById(supervisorId).orElseThrow(() -> new EntityNotFoundException("Supervisor not found with id " + supervisorId));

        course.setSupervisor(supervisor);
        return courseDao.save(course);
    }

//    @Override
//    public List<Course> getCoursesByTeacherName(String teacherName) {
//        return courseDao.findByTeacher_Name(teacherName);
//    }
//
//    @Override
//    public List<Course> getCoursesBySupervisorName(String supervisorName) {
//        return courseDao.findBySupervisor_Name(supervisorName);
//    }

//    @Override
//    public List<Course> getCoursesByGrade(String gradeName) {
//        return courseDao.findByGrade_Name(gradeName);
//    }

}

