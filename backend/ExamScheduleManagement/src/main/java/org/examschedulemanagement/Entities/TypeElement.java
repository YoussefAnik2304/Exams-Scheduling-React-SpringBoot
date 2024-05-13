package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class TypeElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idType ;
    private String titre ;
    @JsonIgnore
    @OneToMany(mappedBy = "typeElement",cascade = CascadeType.ALL)
    private List<Course> courses;

}
