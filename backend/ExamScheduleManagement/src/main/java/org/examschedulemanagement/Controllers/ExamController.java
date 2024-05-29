package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Dto.ExamForm1Dto;
import org.examschedulemanagement.Dto.ExamForm2Dto;
import org.examschedulemanagement.Dto.ExamResponseDto;
import org.examschedulemanagement.Entities.Exam;
import org.examschedulemanagement.Entities.Surveillance;
import org.examschedulemanagement.Service.Exam.ExamService;
import org.examschedulemanagement.Service.Professor.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Exams")
public class ExamController {
    @Autowired
    private ExamService examService;
    @GetMapping
    public ResponseEntity<List<Exam>> listOfExams(){
        List<Exam> exams =examService.getAll();
        return ResponseEntity.ok(exams);
    }
    @PostMapping("/form1")
    public ResponseEntity<ExamResponseDto> processForm1(@RequestBody ExamForm1Dto form){
        return ResponseEntity.ok(examService.processForm1(form));
    }
    @PostMapping("/form2")
    public ResponseEntity<?> processForm2(@RequestBody ExamForm2Dto form){
        return ResponseEntity.ok(examService.processForm2(form));
    }
    @PostMapping("/form3")
    public ResponseEntity<?> processForm3(@RequestBody Exam exam ){
        return ResponseEntity.ok(examService.processForm3(exam));
    }
}
