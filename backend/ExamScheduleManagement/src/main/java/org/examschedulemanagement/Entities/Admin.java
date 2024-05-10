package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class Admin extends Professor{
    @OneToMany(mappedBy = "abscenceController",cascade = CascadeType.ALL)
    private Set<Surveillance> surveillances;
}
