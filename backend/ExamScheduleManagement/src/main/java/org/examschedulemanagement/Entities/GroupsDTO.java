package org.examschedulemanagement.Entities;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
@Getter
@Setter
public class GroupsDTO {
    private Long id;
    private String name;
    private Set<Long> memberIds;
}
