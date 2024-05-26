package org.examschedulemanagement.Controllers;

import jakarta.persistence.EntityNotFoundException;
import org.examschedulemanagement.Entities.Course;
import org.examschedulemanagement.Service.Course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course newCourse = courseService.addCourse(course);
        return ResponseEntity.status(201).body(newCourse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        if (updatedCourse != null) {
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        if (course != null) {
            courseService.deleteCourse(course);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{courseId}/assign-professor/{professorId}")
    public ResponseEntity<Course> assignProfessorToCourse(@PathVariable Long courseId, @PathVariable Long professorId) {
        try {
            Course course = courseService.assignProfessorToCourse(courseId, professorId);
            return ResponseEntity.ok(course);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{courseId}/assign-supervisor/{supervisorId}")
    public ResponseEntity<Course> assignSupervisorToCourse(@PathVariable Long courseId, @PathVariable Long supervisorId) {
        try {
            Course course = courseService.assignSupervisorToCourse(courseId, supervisorId);
            return ResponseEntity.ok(course);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //    @GetMapping("/teacher/{teacherName}")
//    public List<Course> getCoursesByTeacherName(@PathVariable String teacherName) {
//        return courseService.getCoursesByTeacherName(teacherName);
//    }
//
//    @GetMapping("/supervisor/{supervisorName}")
//    public List<Course> getCoursesBySupervisorName(@PathVariable String supervisorName) {
//        return courseService.getCoursesBySupervisorName(supervisorName);
//    }

//    @GetMapping("/grade/{gradeName}")
//    public List<Course> getCoursesByGrade(@PathVariable String gradeName) {
//        return courseService.getCoursesByGrade(gradeName);
//    }
}

