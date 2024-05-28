package org.examschedulemanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Setter
@Getter
public class Groups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "group" ,cascade = CascadeType.ALL)
    private List<Professor> members=new ArrayList<>();

}
