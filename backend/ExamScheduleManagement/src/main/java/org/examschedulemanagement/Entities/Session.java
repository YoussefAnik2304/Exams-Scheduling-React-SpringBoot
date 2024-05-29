package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @JsonIgnore
    @OneToMany(mappedBy = "session",cascade = CascadeType.ALL)
    private List<Exam> examsInSession;
}
