package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionDao extends JpaRepository<Session,Long> {
}
