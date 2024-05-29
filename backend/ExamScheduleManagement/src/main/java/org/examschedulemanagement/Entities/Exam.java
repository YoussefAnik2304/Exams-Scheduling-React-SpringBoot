package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    public Exam(Semester semestere, Session session, Course course, TypeExam typeExam, LocalDate date, LocalDateTime starting_hour, int plannedDuration,  Surveillance exam_surveill, List<SalleAssignment> assignments) {
        this.semestere = semestere;
        this.session = session;
        this.course = course;
        this.typeExam = typeExam;
        this.date = date;
        this.startingHour = starting_hour;
        this.plannedDuration = plannedDuration;
        this.exam_surveill = exam_surveill;
        this.assignments = assignments;
    }

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semestere;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "typeExam_id")
    private TypeExam typeExam;

    private LocalDate date;
    private LocalDateTime startingHour;
    private int plannedDuration ;
    private int actualDuration;

    @ManyToOne
    @JoinColumn(name = "surveill_id")
    private Surveillance exam_surveill;
    @JsonIgnore
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<SalleAssignment> assignments;

    private String epreuve ;
    private String Pv;
    private String Rapport;
}
