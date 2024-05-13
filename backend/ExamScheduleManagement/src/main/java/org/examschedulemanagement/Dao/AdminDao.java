package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AdminDao extends JpaRepository<Admin,Long> {
    boolean existsAdminByEmail(String email);
    Admin getAdminByEmail(String email);

}
