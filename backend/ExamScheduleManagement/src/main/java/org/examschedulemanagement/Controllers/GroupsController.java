package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.PersonnelDto;
import org.examschedulemanagement.Service.GroupsService;
import org.examschedulemanagement.Service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("Group")
public class GroupsController {
    @Autowired
    private GroupsService groupsService;
    @Autowired
    private PersonnelService personnelService;
    @GetMapping("/List")
    public ResponseEntity<List<Groups>> getAllGroups(){
        List<Groups> groups =groupsService.getAllGroups();
        if(groups!=null){
            return ResponseEntity.ok(groups);
        }else
            return ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroup(@PathVariable Long id ){
        Groups group =groupsService.getGroupByID(id);
        if(group!=null){
            return ResponseEntity.ok(group);
        }else
            return ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}/members")
    public ResponseEntity<List<PersonnelDto>> getGroupMembers(@PathVariable Long id){
        List<PersonnelDto> members =groupsService.getGroupMembers(id);
        if(members!=null){
            return ResponseEntity.ok(members);
        }else
            return ResponseEntity.notFound().build();
    }
    @PostMapping("/add")
    public ResponseEntity<Groups> addGroup(@RequestBody Groups group ){
        Groups addedGroup=groupsService.add_group(group);
        return ResponseEntity.created(URI.create("/" + addedGroup.getId())).body(addedGroup);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Groups> updateGroup(@PathVariable Long id, @RequestBody Groups updatedGroup) {
        // Logic to update resource
        Groups groupUpdated=groupsService.update_group(id,updatedGroup);
        if(groupUpdated!=null){
            return ResponseEntity.ok(groupUpdated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Example of a DELETE method
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Groups> deleteGroup(@PathVariable Long id) {
        // Logic to delete resource
        Groups group = groupsService.getGroupByID(id);
        if (group != null) {
            Groups groupremoved=groupsService.remove_group(id);
            return ResponseEntity.ok(groupremoved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("{group_id}/addMember/{Personnel_id}")
    public ResponseEntity<Boolean> assignMemberToGroup (@PathVariable Long group_id,@PathVariable Long Personnel_id){
        groupsService.assignPersonnelToGroup(group_id,Personnel_id);
        return ResponseEntity.ok(true);
    }

}
