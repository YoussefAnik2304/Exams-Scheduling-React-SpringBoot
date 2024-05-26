package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class Admin extends Personnel{
    @JsonIgnore
    @OneToMany(mappedBy = "abscenceController",cascade = CascadeType.ALL)
    private List<Surveillance> surveillances;

}
