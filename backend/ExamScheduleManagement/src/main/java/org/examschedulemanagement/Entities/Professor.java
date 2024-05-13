package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Professor extends Personnel{
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Groups group;

    @ManyToOne
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;

    @ManyToOne
    @JoinColumn(name = "departement_id")
    private Departement departement;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher",cascade = CascadeType.ALL)
    private Set<Course> coursesTeaching;
    @JsonIgnore
    @OneToMany(mappedBy = "supervisor",cascade = CascadeType.ALL)
    private Set<Course> coursesSupervising;

    @JsonIgnore
    @ManyToMany(mappedBy = "surveil_profs",cascade = CascadeType.ALL)
    private Set<Surveillance> surveid_surveil=new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "survaillance_id")
    private Surveillance cordinated_surveil;

}
