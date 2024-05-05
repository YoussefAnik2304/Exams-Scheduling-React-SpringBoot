package org.examschedulemanagement.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.PersonnelDao;
import org.examschedulemanagement.Entities.Personnel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PersonnelServiceImpl implements PersonnelService{
    private final PersonnelDao personnelRepository;

    public PersonnelServiceImpl(PersonnelDao personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    @Override
    public Personnel add_personnel(Personnel personnel) {
        return personnelRepository.save(personnel);
    }

    @Override
    public Personnel update_personnel(Long id, Personnel updatedPersonnel) {
        Optional<Personnel> optionalPersonnel = personnelRepository.findById(id);
        if (optionalPersonnel.isPresent()) {
            Personnel existingPersonnel = optionalPersonnel.get();
            existingPersonnel.setFirstName(updatedPersonnel.getFirstName());
            existingPersonnel.setLastName(updatedPersonnel.getLastName());
            existingPersonnel.setType(updatedPersonnel.getType());
            existingPersonnel.setEmail(updatedPersonnel.getEmail());
            existingPersonnel.setPassword(updatedPersonnel.getPassword());

            return personnelRepository.save(existingPersonnel);
        } else {
            // Handle the case when the personnel with the given ID is not found
            throw new EntityNotFoundException("Personnel with id " + id + " not found");
        }
    }



    @Override
    public Personnel delete_personnel(Personnel personnel) {
        if (exists(personnel.getId())) {
            personnelRepository.delete(personnel);
            return personnel;
        }else
            return null;
    }

    @Override
    public List<Personnel> getPersonnels() {
        return personnelRepository.findAll();
    }

    @Override
    public Personnel getPersonnelsByID(Long id) {
        return  personnelRepository.getReferenceById(id);
    }

    @Override
    public Boolean exists(Long id) {
        return personnelRepository.existsById(id);
    }
}
