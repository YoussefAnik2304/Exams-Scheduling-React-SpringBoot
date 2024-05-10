package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semestere;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "typeExam_id")
    private TypeExam typeExam;

    private LocalDate date;
    private LocalDateTime starting_hour;
    private int plannedDuration ;
    private int actualDuration;

    @ManyToOne
    @JoinColumn(name = "surveill_id")
    private Surveillance exam_surveill;

    private String epreuve ;
    private String Pv;
    private String Rapport;
}
