package org.examschedulemanagement.Service;

import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.PersonnelDto;

import java.util.List;

public interface GroupsService {
     void assignPersonnelToGroup(Long groupId, Long personnelId);
     List<PersonnelDto> getGroupMembers(Long groupId);
     Groups add_group(Groups groups);
     Groups update_group(Long id ,Groups groups);
     Groups remove_group(Long id );
     List<Groups> getAllGroups();

    Groups getGroupByID(Long id);
}
