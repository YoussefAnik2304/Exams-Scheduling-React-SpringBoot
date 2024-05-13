package org.examschedulemanagement.Dao;

import org.examschedulemanagement.Entities.Groups;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;;

public interface GroupsDao extends JpaRepository<Groups,Long> {
    Groups getGroupsByName(String name );
}
