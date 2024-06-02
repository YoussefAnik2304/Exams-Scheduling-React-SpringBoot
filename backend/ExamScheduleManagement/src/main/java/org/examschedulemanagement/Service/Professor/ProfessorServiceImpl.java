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

import java.util.List;;;

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
    public void assignDepartementToProfessor(Long professorId, String departement_name) {
        Professor professor = professorDao.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id: " + professorId));

        Departement departement = departementDao.getDepartementByNom(departement_name);

        professor.setDepartement(departement); // Assign filiere to professor

        professorDao.save(professor); // Save professor with assigned filiere
    }

    @Override
    public void assignFiliereToProfessor(Long professorId, String filiere_name) {
        Professor professor = professorDao.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id: " + professorId));

        Filiere filiere = filiereDao.getFiliereByName(filiere_name);

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
        return professorDao.getProfessorByEmail(email);

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
