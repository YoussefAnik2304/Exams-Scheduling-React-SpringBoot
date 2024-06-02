package org.examschedulemanagement.Service.Professor;

import org.examschedulemanagement.Entities.Professor;

import java.util.List;;;

public interface ProfessorService {
    void assignDepartementToProfessor(Long professorId, String departementName);
    void assignFiliereToProfessor(Long professorId, String filiereName);
    List<Professor> getProfessors();
    Professor getProfessorById(Long id );
    Professor getProfessorByEmail(String email);
    Professor addProfessor(Professor professor);
    Professor updateProfessor(Long id ,Professor professor);
    Professor deleteProfessor(Professor professor);
}
