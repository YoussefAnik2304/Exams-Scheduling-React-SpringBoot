package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Surveillance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Surveillance_profs",
            joinColumns = @JoinColumn(name = "surveillance_id"),
            inverseJoinColumns = @JoinColumn(name = "prof_id")
    )
    private List<Professor> surveil_profs=new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "cordinated_surveil",cascade = CascadeType.ALL)
    private List<Professor> coordinators;

    @ManyToOne
    @JoinColumn(name = "surveill_id")
    private Admin abscenceController;

    @JsonIgnore
    @OneToMany(mappedBy = "surveillance",cascade = CascadeType.ALL)
    private List<Salle> salles;

    @JsonIgnore
    @OneToMany(mappedBy = "exam_surveill",cascade = CascadeType.ALL)
    private List<Exam> exams;

}
