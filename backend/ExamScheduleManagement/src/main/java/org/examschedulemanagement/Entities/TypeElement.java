package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class TypeElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idType ;
    private String titre ;
    @OneToMany(mappedBy = "typeElement",cascade = CascadeType.ALL)
    private Set<Course> courses;

}
