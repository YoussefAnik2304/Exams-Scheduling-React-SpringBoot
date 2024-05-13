package org.examschedulemanagement.Dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.examschedulemanagement.Entities.TypeElement;
public interface TypeElementDao extends JpaRepository<TypeElement,Long> {
}
