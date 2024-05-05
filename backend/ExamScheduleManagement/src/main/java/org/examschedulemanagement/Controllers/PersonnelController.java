package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Service.GroupsService;
import org.examschedulemanagement.Service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("Personnel")
public class PersonnelController {
    @Autowired
    private PersonnelService personnelService;
    @Autowired
    private GroupsService groupsService;
    @GetMapping("/List")
    public ResponseEntity<List<Personnel>> GetPersonnels(){
        List<Personnel> personnels =personnelService.getPersonnels();
        if(personnels!=null){
            return ResponseEntity.ok(personnels);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Personnel> GetPersonnelById(@PathVariable Long id ){
        Personnel personnel =personnelService.getPersonnelsByID(id);
        if(personnel!=null){
            return ResponseEntity.ok(personnel);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<Personnel> createResource(@RequestBody Personnel personnel) {
        // Logic to create resource
        Personnel savedPersonnel = personnelService.add_personnel(personnel);
        return ResponseEntity.created(URI.create("/Personnel/" + savedPersonnel.getId())).body(savedPersonnel);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Personnel> updateResource(@PathVariable Long id, @RequestBody Personnel updatedpersonnel) {
        // Logic to update resource
        Personnel personnelupdated=personnelService.update_personnel(id,updatedpersonnel);
        if(personnelupdated!=null){
            return ResponseEntity.ok(personnelupdated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Example of a DELETE method
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Personnel> deleteResource(@PathVariable Long id) {
        // Logic to delete resource
        Personnel personnel = personnelService.getPersonnelsByID(id);
        if (personnel != null) {
            Personnel removedPersonnel=personnelService.delete_personnel(personnelService.getPersonnelsByID(id));
            return ResponseEntity.ok(removedPersonnel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
