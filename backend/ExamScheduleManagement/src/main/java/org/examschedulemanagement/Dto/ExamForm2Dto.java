package org.examschedulemanagement.Dto;

import lombok.Data;

@Data
public class ExamForm2Dto {
    private ExamResponseDto responseDto;
    private int plannedDuration;
    private int nbrOfSurv;
    private Boolean random;
}
