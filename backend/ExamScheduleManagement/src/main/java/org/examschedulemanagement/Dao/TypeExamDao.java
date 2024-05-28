package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.TypeExam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeExamDao extends JpaRepository<TypeExam,Long> {
    TypeExam getTypeExamByTitre(String titre );
}
