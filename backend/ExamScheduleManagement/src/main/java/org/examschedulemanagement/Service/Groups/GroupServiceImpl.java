package org.examschedulemanagement.Service.Groups;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.DepartementDao;
import org.examschedulemanagement.Dao.FiliereDao;
import org.examschedulemanagement.Dao.GroupsDao;
import org.examschedulemanagement.Dao.ProfessorDao;
import org.examschedulemanagement.Entities.Departement;
import org.examschedulemanagement.Entities.Filiere;
import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.List;

@Service
@Transactional
public class GroupServiceImpl implements GroupService{
    @Autowired
    private GroupsDao groupsDao;
    @Autowired
    private ProfessorDao professorDao;
    @Autowired
    private DepartementDao departementDao;
    @Autowired
    private FiliereDao filiereDao;
    @Override
    public void assignProfessorToGroupByDepartement(Long groupId, Long DepartementId) {
        Groups group=groupsDao.findById(groupId).orElseThrow(()-> new EntityNotFoundException("group not found"));
        Departement dept=departementDao.getReferenceById(DepartementId);
        List<Professor> departemet_professors=dept.getDepartement_profs();
        group.setMembers(departemet_professors);
        groupsDao.save(group);
    }

    @Override
    public void assignProfessorToGroupByFiliere(Long groupId, Long filiereId) {
        Groups group=groupsDao.findById(groupId).orElseThrow(()-> new EntityNotFoundException("group not found"));
        Filiere filiere=filiereDao.getReferenceById(filiereId);
        List<Professor> filiere_professors=filiere.getFilier_profs();
        group.setMembers(filiere_professors);
        groupsDao.save(group);
    }

    @Override
    public void assignProfessorToGroupRandomly(Long groupId) {

    }

    @Override
    public List<Groups> getAllGroups() {
        return groupsDao.findAll();
    }

    @Override
    public Groups getGroupById(Long id) {
        return groupsDao.findById(id).orElse(null);
    }

    @Override
    public Groups addGroup(Groups group) {
        Groups existingGroup =groupsDao.getGroupsByName(group.getName());
        if(existingGroup==null)
            return groupsDao.save(group);
        return null;
    }

    @Override
    public Groups updateGroup(Long id, Groups group) {
        Groups existingGroup=groupsDao.getReferenceById(id);
        if(existingGroup!=null){
            existingGroup.setName(group.getName());

        }
        return groupsDao.save(existingGroup);
    }

    @Override
    public Groups deleteGroup(Groups group) {
        groupsDao.delete(group);
        return group;
    }

    @Override
    public Groups getGroupByName(String name) {
        return groupsDao.getGroupsByName(name);
    }
}
