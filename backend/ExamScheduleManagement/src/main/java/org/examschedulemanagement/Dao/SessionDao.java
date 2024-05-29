package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionDao extends JpaRepository<Session,Long> {
    Session getSessionByTitre(String session);
}
