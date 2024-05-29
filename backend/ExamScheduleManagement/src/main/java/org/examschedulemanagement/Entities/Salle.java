package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String titre ;
    private int capacity ;

    @ManyToOne
    @JoinColumn(name = "salle_id")
    private Surveillance surveillance;

    @JsonIgnore
    @OneToMany(mappedBy = "salle", cascade = CascadeType.ALL)
    private List<SalleAssignment> assignments;
}
