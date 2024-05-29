package org.examschedulemanagement.Service.Groups;

import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Professor;

import java.util.List;
import java.util.Optional;

public interface GroupService {
    void assignProfessorToGroupByDepartement(Long groupId,Long DepartementId);
    void assignProfessorToGroupByFiliere(Long groupId,Long filiereId);
    Groups assignProfessorToGroupRandomly(Long groupId);
    List<Groups> getAllGroups();
    Groups getGroupById(Long id );
    Groups addGroup(Groups group );
    Groups updateGroup(Long id ,Groups group );
    Groups deleteGroup(Groups group );
    Groups getGroupByName(String name);


}
