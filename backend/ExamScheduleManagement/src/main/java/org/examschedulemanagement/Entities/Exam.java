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

    public Exam(Semester semestere, Session session, Course course, TypeExam typeExam, LocalDate date, LocalDateTime starting_hour, int plannedDuration) {
        this.semestere = semestere;
        this.session = session;
        this.course = course;
        this.typeExam = typeExam;
        this.date = date;
        this.startingHour = starting_hour;
        this.plannedDuration = plannedDuration;
    }
    private Semester semestere;

    private Session session;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private TypeExam typeExam;

    private LocalDate date;
    private LocalDateTime startingHour;
    private int plannedDuration ;
    private int actualDuration;
    @JsonIgnore
    @OneToMany(mappedBy = "exam",cascade = CascadeType.ALL)
    private List<Surveillance> exam_surveill;


    private String epreuve ;
    private String Pv;
    private String Rapport;
}
