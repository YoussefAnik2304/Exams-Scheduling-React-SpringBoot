package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementDao extends JpaRepository<Departement,Long> {
}
