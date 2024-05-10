package org.examschedulemanagement.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;


    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Professor teacher;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Professor supervisor;

    @ManyToOne
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @ManyToOne
    @JoinColumn(name = "element_type_id")
    private TypeElement typeElement;
}