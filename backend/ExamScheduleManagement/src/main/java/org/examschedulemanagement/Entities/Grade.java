package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
@Entity
@Getter
@Setter
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGrade ;
    private String titre ;
    @OneToMany(mappedBy = "grade",cascade = CascadeType.ALL)
    private Set<Course> courses;
}
