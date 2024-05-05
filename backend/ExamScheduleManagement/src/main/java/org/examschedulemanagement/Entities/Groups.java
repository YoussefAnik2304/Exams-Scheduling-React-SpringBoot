package org.examschedulemanagement.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
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

    @ManyToMany
    @JoinTable(
            name = "personnel_group",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "personnel_id"))
    private List<Personnel> members;
    public static GroupsDTO ConvertGroupToDto(Groups group){
        GroupsDTO dto = new GroupsDTO();
        dto.setId(group.getId());
        dto.setName(group.getName());
        // Populate memberIds based on the IDs of personnel members associated with the group
        dto.setMemberIds(group.getMembers().stream().map(Personnel::getId).collect(Collectors.toSet()));
        return dto;
    }
    // Getters and setters
}
