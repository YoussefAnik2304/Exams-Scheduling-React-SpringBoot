package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Dao.DepartementDao;
import org.examschedulemanagement.Dao.FiliereDao;
import org.examschedulemanagement.Entities.Groups;
import org.examschedulemanagement.Entities.Professor;
import org.examschedulemanagement.Service.Groups.GroupService;
import org.examschedulemanagement.Service.Professor.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("Groups")
public class GroupsController {
    @Autowired
    private GroupService groupsService;
    @Autowired
    private ProfessorService professorService;
    @Autowired
    private FiliereDao filiereDao;
    @Autowired
    private DepartementDao departementDao;

    @GetMapping("/List")
    public ResponseEntity<List<Groups>> getAllGroups(){
        List<Groups> allGroups=groupsService.getAllGroups();
        if(allGroups!=null)
            return ResponseEntity.ok(allGroups);
        else return ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroup(@PathVariable Long id ){
        Groups group =groupsService.getGroupById(id);
        if(group!=null)
            return ResponseEntity.ok(group);
        else return ResponseEntity.notFound().build();

    }
    @GetMapping("/{id}/members")
    public ResponseEntity<List<Professor>> getGroupMembers(@PathVariable Long id){
        Groups group =groupsService.getGroupById(id);
        List<Professor> members=group.getMembers();
        System.out.println(members);
        if(group!=null && members!=null)
            return ResponseEntity.ok(members);
        else return ResponseEntity.notFound().build();
    }
    @PostMapping("/add")
    public ResponseEntity<Groups> addGroup(@RequestBody Groups group ){
        Groups addedGroup=groupsService.addGroup(group);
        if(addedGroup!=null){
            return ResponseEntity.ok(addedGroup)  ;
        }
        return ResponseEntity.badRequest().header("error","a group by the name "+group.getName()+" already exists ").build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Groups> updateGroup(@PathVariable Long id, @RequestBody Groups updatedGroup) {
        Groups Group= groupsService.updateGroup(id,updatedGroup);
        if(Group!=null)
            return ResponseEntity.ok(Group);
        else return ResponseEntity.notFound().build();
    }

    // Example of a DELETE method
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Groups> deleteGroup(@PathVariable Long id) {
        Groups removedGroup= groupsService.deleteGroup(groupsService.getGroupById(id));
        if(removedGroup!=null)
            return ResponseEntity.ok(removedGroup);
        else return ResponseEntity.notFound().build();
    }
    @PostMapping("{group_id}/addMembers/{choice}/{filDep_id}")
    public ResponseEntity<Groups> assignMemberToGroup (@PathVariable Long group_id, @PathVariable String choice, @PathVariable String filDep_id){
        if(choice.equals("FILIERE"))
            return ResponseEntity.ok().body(groupsService.assignProfessorToGroupByFiliere(group_id,filiereDao.getFiliereByName(filDep_id).getId()));
        else if(choice.equals("DEPARTEMENT"))
            return ResponseEntity.ok().body(groupsService.assignProfessorToGroupByDepartement(group_id,departementDao.getDepartementByNom(filDep_id).getId()));
        else return ResponseEntity.ok().body(groupsService.assignProfessorToGroupRandomly(group_id));
    }
    @PostMapping("{group_id}/addMembers/random")
    public ResponseEntity<Groups> assignMemberToGroup (@PathVariable Long group_id){
        return ResponseEntity.ok().body(groupsService.assignProfessorToGroupRandomly(group_id));
    }

}
