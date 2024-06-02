package org.examschedulemanagement.Entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class SalleAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "salle_id", nullable = false)
    private Salle salle;

    @ManyToMany(mappedBy = "assignments",cascade = CascadeType.ALL)
    private List<Professor> professors;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;
}
