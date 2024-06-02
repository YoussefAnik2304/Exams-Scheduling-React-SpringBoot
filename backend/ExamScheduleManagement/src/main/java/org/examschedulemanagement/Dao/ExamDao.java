package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamDao extends JpaRepository<Exam,Long> {
    Exam findAllBySemestereAndSessionAndCourseAndTypeExamAndStartingHour(Semester semester, Session session, Course course, TypeExam typeExam, LocalDateTime startingHour);
    List<Exam> findAllByDateAndStartingHour(LocalDate date , LocalDateTime starting_hour);

    Exam findAllByDateAndSemestereAndSessionAndCourseAndTypeExamAndStartingHour(LocalDate date, Semester semester, Session session, Course course, TypeExam typeExam, LocalDateTime startingHour);
}
