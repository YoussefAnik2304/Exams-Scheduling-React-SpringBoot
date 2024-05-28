package org.examschedulemanagement.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExamResponseDto {
    private ExamForm1Dto examForm1Dto;
    private int plannedDuration;
    private int nbrStudents;
}
