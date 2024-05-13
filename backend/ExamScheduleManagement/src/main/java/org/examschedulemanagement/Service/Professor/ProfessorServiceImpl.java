package org.examschedulemanagement.Service.Professor;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.DepartementDao;
import org.examschedulemanagement.Dao.FiliereDao;
import org.examschedulemanagement.Dao.ProfessorDao;
import org.examschedulemanagement.Entities.Departement;
import org.examschedulemanagement.Entities.Filiere;
import org.examschedulemanagement.Entities.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProfessorServiceImpl implements ProfessorService{
    @Autowired
    private ProfessorDao professorDao;
    @Autowired
    private FiliereDao filiereDao;
    @Autowired
    private DepartementDao departementDao;

    @Override
    public void assignDepartementToProfessor(Long professorId, Long departementId) {
        Professor professor = professorDao.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id: " + professorId));

        Departement departement = departementDao.findById(departementId)
                .orElseThrow(() -> new EntityNotFoundException("departement not found with id: " + departementId));

        professor.setDepartement(departement); // Assign filiere to professor

        professorDao.save(professor); // Save professor with assigned filiere
    }

    @Override
    public void assignFiliereToProfessor(Long professorId, Long filiereId) {
        Professor professor = professorDao.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id: " + professorId));

        Filiere filiere = filiereDao.findById(filiereId)
                .orElseThrow(() -> new EntityNotFoundException("Filiere not found with id: " + filiereId));

        professor.setFiliere(filiere); // Assign filiere to professor

        professorDao.save(professor); // Save professor with assigned filiere
    }

    @Override
    public List<Professor> getProfessors() {
        return  professorDao.findAll();
    }

    @Override
    public Professor getProfessorById(Long id) {
        return professorDao.getReferenceById(id);
    }

    @Override
    public Professor getProfessorByEmail(String email) {
        List<Professor> professors=professorDao.findAll();
        for(Professor prof : professors){
            if(prof.getEmail().equals(email))
                return prof;
        }
        return null;
    }

    @Override
    public Professor addProfessor(Professor professor) {
        if(professorDao.getProfessorByEmail(professor.getEmail())!=null)
            return null ;
        return professorDao.save(professor);
    }

    @Override
    public Professor updateProfessor(Long id, Professor professor) {
        Professor updatedprofessor =professorDao.getReferenceById(id);
        updatedprofessor.setEmail(professor.getEmail());
        updatedprofessor.setLastName(professor.getLastName());
        updatedprofessor.setFirstName(professor.getFirstName());
        updatedprofessor.setPassword(professor.getPassword());
        return professorDao.save(updatedprofessor);
    }

    @Override
    public Professor deleteProfessor(Professor professor) {
        try{
            professorDao.delete(professor);
        }catch (Exception e ){
            return null;
        }
        return professor;

    }

}
