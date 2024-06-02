package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface AdminDao extends JpaRepository<Admin,Long> {
    boolean existsAdminByEmail(String email);
    Admin getAdminByEmail(String email);
    @Query("SELECT a FROM Admin a WHERE NOT EXISTS (SELECT 1 FROM Surveillance s WHERE s.abscenceController = a)")
    List<Admin> findByNotInAbcenceController();

}
