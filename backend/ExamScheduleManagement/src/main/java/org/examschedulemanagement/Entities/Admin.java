package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class Admin extends Personnel{
    @JsonIgnore
    @OneToMany(mappedBy = "abscenceController",cascade = CascadeType.ALL)
    private Set<Surveillance> surveillances;
}
