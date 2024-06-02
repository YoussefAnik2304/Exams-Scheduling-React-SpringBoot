import { Course } from "@/types/Course";

export interface Exam {
    id?: number;
    semestere: Semester;
    session: Session;
    course: Course;
    typeExam: TypeExam;
    date: string;
    startingHour: string;
    plannedDuration: number;
    actualDuration: number;
    exam_surveill: Surveillance;
    assignments: SalleAssignment[];
    epreuve: string;
    Pv: string;
    Rapport: string;
}

export interface Semester {
    id?: number;
}

export interface Session {
    id?: number;
}

export interface TypeExam {
    id?: number;
    // Add properties as needed
}

export interface Surveillance {
    id?: number;
}

export interface SalleAssignment {
    id?: number;
}

export interface ExamForm1Dto {
    semestere: string;
    session: string;
    course: string;
    typeExam: string;
    date: string;
    starting_hour: string;
}

export interface ExamForm2Dto {
    responseDto: ExamResponseDto;
    plannedDuration: number;
    nbrOfSurv: number;
    random: boolean;
}

export interface ExamResponseDto {
    examForm1Dto: ExamForm1Dto;
    plannedDuration: number;
    nbrStudents: number;
}

export interface ExamForm3Dto {
    responseDto: ExamResponseDto;
    actualDuration: number;
    exam_surveill: Surveillance;
    assignments: SalleAssignment[];
    epreuve: string;
    Pv: string;
    Rapport: string;
}
