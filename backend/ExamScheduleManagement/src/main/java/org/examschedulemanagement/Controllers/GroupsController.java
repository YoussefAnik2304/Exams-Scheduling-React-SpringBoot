package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Personnel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Group")
public class GroupsController {
    /*
    @Autowired
    private GroupsService groupsService;
    @Autowired
    private PersonnelService personnelService;
    @GetMapping("/List")
    public ResponseEntity<List<Groups>> getAllGroups(){

    }
    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroup(@PathVariable Long id ){

    }
    @GetMapping("/{id}/members")
    public ResponseEntity<List<Personnel>> getGroupMembers(@PathVariable Long id){

    }
    @PostMapping("/add")
    public ResponseEntity<Groups> addGroup(@RequestBody Groups group ){

    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Groups> updateGroup(@PathVariable Long id, @RequestBody Groups updatedGroup) {

    }

    // Example of a DELETE method
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Groups> deleteGroup(@PathVariable Long id) {

    }
    @PostMapping("{group_id}/addMember/{Personnel_id}")
    public ResponseEntity<Boolean> assignMemberToGroup (@PathVariable Long group_id,@PathVariable Long Personnel_id){

    }
*/
}
