package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FiliereDao extends JpaRepository<Filiere,Long> {
    Filiere getFiliereById(Long id );

    Filiere getFiliereByName(String filiereName);
}
