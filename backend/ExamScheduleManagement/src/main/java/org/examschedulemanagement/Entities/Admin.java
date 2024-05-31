package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends Personnel{
    @JsonIgnore
    @OneToMany(mappedBy = "abscenceController",cascade = CascadeType.ALL)
    private List<Surveillance> surveillances;

    public Admin( String firstName, String lastName, String email, String password,String profilePhoto) {
        super( firstName, lastName, email, password,profilePhoto);
    }
}
