package org.examschedulemanagement.Service;

import org.examschedulemanagement.Entities.Personnel;

import java.util.List;

public interface PersonnelService {
    Personnel add_personnel(Personnel personnel);
    Personnel update_personnel(Long id,Personnel personnel);
    Personnel delete_personnel(Personnel personnel);
    List<Personnel> getPersonnels();
    Personnel getPersonnelsByID(Long id);
    Boolean exists(Long id );
}
