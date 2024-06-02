package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.List;

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
    private List<Course> coursesTeaching;
    @JsonIgnore
    @OneToMany(mappedBy = "supervisor",cascade = CascadeType.ALL)
    private List<Course> coursesSupervising;

    @JsonIgnore
    @ManyToMany(mappedBy = "surveil_profs",cascade = CascadeType.ALL)
    private List<Surveillance> surveid_surveil=new ArrayList<>();


    @OneToMany(mappedBy = "coordinator",cascade = CascadeType.ALL)
    private List<Surveillance> cordinated_surveils;

}
