package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDao extends JpaRepository<Admin,Long> {
}
