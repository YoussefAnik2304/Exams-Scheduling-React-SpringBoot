package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
@Repository
public interface ExamDao extends JpaRepository<Exam,Long> {
    Exam findAllBySemestereAndSessionAndCourseAndTypeExamAndStartingHour(Semester semester, Session session, Course course, TypeExam typeExam, LocalDateTime startingHour);
    Exam findAllByDateAndStartingHour(LocalDate date ,LocalDateTime starting_hour);
}
