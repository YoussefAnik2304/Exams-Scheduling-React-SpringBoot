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

import java.util.Set;

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
        Set<Professor> departemet_professors=dept.getDepartement_profs();
        group.setMembers(departemet_professors);
        groupsDao.save(group);
    }

    @Override
    public void assignProfessorToGroupByFiliere(Long groupId, Long filiereId) {
        Groups group=groupsDao.findById(groupId).orElseThrow(()-> new EntityNotFoundException("group not found"));
        Filiere filiere=filiereDao.getReferenceById(filiereId);
        Set<Professor> filiere_professors=filiere.getFilier_profs();
        group.setMembers(filiere_professors);
        groupsDao.save(group);
    }

    @Override
    public void assignProfessorToGroupRandomly(Long groupId) {

    }
}
