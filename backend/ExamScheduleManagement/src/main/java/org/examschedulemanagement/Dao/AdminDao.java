package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AdminDao extends JpaRepository<Admin,Long> {
    boolean existsAdminByEmail(String email);
    Admin getAdminByEmail(String email);

}
