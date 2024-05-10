package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.EnableMBeanExport;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Surveillance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Surveillance_profs",
            joinColumns = @JoinColumn(name = "surveillance_id"),
            inverseJoinColumns = @JoinColumn(name = "prof_id")
    )
    private Set<Professor> surveil_profs=new HashSet<>();

    @OneToMany(mappedBy = "cordinated_surveil",cascade = CascadeType.ALL)
    private Set<Professor> coordinators;

    @ManyToOne
    @JoinColumn(name = "surveill_id")
    private Admin abscenceController;

    @OneToMany(mappedBy = "surveillance",cascade = CascadeType.ALL)
    private Set<Salle> salles;

    @OneToMany(mappedBy = "exam_surveill",cascade = CascadeType.ALL)
    private Set<Exam> exams;

}
