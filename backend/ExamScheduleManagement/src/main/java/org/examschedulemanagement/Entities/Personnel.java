package org.examschedulemanagement.Entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Setter
@Getter
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private PersonnelType type;
    private String email;
    private String password;

    @ManyToMany(mappedBy = "members")
    private Set<Groups> groups;

    public static PersonnelDto ConvertPersonnelToDto(Personnel personnel){
        PersonnelDto dto = new PersonnelDto();
        dto.setId(personnel.getId());
        dto.setFirstName(personnel.firstName);
        dto.setLastName(personnel.lastName);
        dto.setType(personnel.getType());
        dto.setEmail(personnel.getEmail());

        // Populate memberIds based on the IDs of personnel members associated with the group
        dto.setGroupsIds( personnel.getGroups().stream().map(Groups::getId).collect(Collectors.toSet()));
        return dto;
    }
    // Getters and setters
}
