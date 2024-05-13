package org.examschedulemanagement.Service.Groups;

public interface GroupService {
    void assignProfessorToGroupByDepartement(Long groupId,Long DepartementId);
    void assignProfessorToGroupByFiliere(Long groupId,Long filiereId);
    void assignProfessorToGroupRandomly(Long groupId);

}
