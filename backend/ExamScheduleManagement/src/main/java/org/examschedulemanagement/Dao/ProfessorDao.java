package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProfessorDao extends JpaRepository<Professor,Long> {
    Professor getProfessorByEmail(String email);
    @Query("SELECT p FROM Professor p WHERE p.group IS NULL")
    List<Professor> findProfessorsWithoutGroup();
    @Query("SELECT p FROM Professor p WHERE p.group IS NULL AND p.departement.id = :departementId")
    List<Professor> findAvailableProfessorsByDepartement(Long departementId);

    @Query("SELECT p FROM Professor p WHERE p.group IS NULL AND p.filiere.id = :filiereId")
    List<Professor> findAvailableProfessorsByFiliere(Long filiereId);
}
