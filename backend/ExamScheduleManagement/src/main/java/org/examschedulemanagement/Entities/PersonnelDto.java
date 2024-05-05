package org.examschedulemanagement.Entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class PersonnelDto {
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private PersonnelType type;
    private Set<Long> GroupsIds;

}
