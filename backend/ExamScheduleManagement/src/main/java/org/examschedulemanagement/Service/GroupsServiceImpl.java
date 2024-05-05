package org.examschedulemanagement.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.GroupsDao;
import org.examschedulemanagement.Dao.PersonnelDao;
import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.PersonnelDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GroupsServiceImpl implements GroupsService {
    private final GroupsDao groupRepository;
    private final PersonnelDao personnelRepository;

    public GroupsServiceImpl(GroupsDao groupRepository, PersonnelDao personnelRepository) {
        this.groupRepository = groupRepository;
        this.personnelRepository = personnelRepository;
    }
    public void assignPersonnelToGroup(Long groupId, Long personnelId) {
        Groups group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));

        Personnel personnel = personnelRepository.findById(personnelId)
                .orElseThrow(() -> new EntityNotFoundException("Personnel not found"));

        group.getMembers().add(personnel);
        groupRepository.save(group);
    }

    public List<PersonnelDto> getGroupMembers(Long groupId) {
        Groups group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        List<PersonnelDto> membersdto=new ArrayList<>();
        for (Personnel p : group.getMembers()){
            membersdto.add(Personnel.ConvertPersonnelToDto(p));
        }
        return membersdto;
    }

    @Override
    public Groups add_group(Groups groups) {
        return groupRepository.save(groups);
    }

    @Override
    public Groups update_group(Long id, Groups updatedgroup) {
        Optional<Groups> optionalGroups = groupRepository.findById(id);
        if (optionalGroups.isPresent()) {
            Groups existingGroup = optionalGroups.get();
            existingGroup.setName(updatedgroup.getName());
            return groupRepository.save(existingGroup);
        } else {
            // Handle the case when the personnel with the given ID is not found
            throw new EntityNotFoundException("Group with id " + id + " not found");
        }
    }

    @Override
    public Groups remove_group(Long id ) {
        Groups removeGroup=groupRepository.getReferenceById(id);
        groupRepository.delete(removeGroup);
        return removeGroup;
    }

    @Override
    public List<Groups> getAllGroups() {
        return groupRepository.findAll();
    }
    @Override
    public Groups getGroupByID(Long id){
        return groupRepository.getReferenceById(id);
    }

}
