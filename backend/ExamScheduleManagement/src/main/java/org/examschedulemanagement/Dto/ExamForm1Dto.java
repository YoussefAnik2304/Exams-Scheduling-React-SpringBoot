package org.examschedulemanagement.Dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.examschedulemanagement.Entities.Course;
import org.examschedulemanagement.Entities.Semester;
import org.examschedulemanagement.Entities.Session;
import org.examschedulemanagement.Entities.TypeExam;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter
@Setter
public class ExamForm1Dto {
    private String semestere;
    private String session;
    private String course;
    private String typeExam;

    private LocalDate date;
    private LocalDateTime starting_hour;
}
