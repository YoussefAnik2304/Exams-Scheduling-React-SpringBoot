package org.examschedulemanagement.Service.Exam;

import org.examschedulemanagement.Dto.ExamForm1Dto;
import org.examschedulemanagement.Dto.ExamForm2Dto;
import org.examschedulemanagement.Dto.ExamResponseDto;
import org.examschedulemanagement.Entities.Exam;

import java.util.List;

public interface ExamService {
    List<Exam> getAll();

    ExamResponseDto processForm1(ExamForm1Dto form);

    Exam processForm2(ExamForm2Dto form);

    Exam processForm3(Exam exam);
}
