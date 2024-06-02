package org.examschedulemanagement.Service.Exam;

import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.*;
import org.examschedulemanagement.Dto.ExamForm1Dto;
import org.examschedulemanagement.Dto.ExamForm2Dto;
import org.examschedulemanagement.Dto.ExamResponseDto;
import org.examschedulemanagement.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExamServiceImpl implements ExamService {
   @Autowired
    private ExamDao examDao;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private ProfessorDao professorDao;
    @Autowired
    private SalleDao salleDao;
    @Autowired
    private SalleAssignmentDao salleAssignmentDao;
    @Autowired
    private SurveillanceDao surveillanceDao;
    @Override
    public List<Exam> getAll() {
        return examDao.findAll();
    }

    @Override
    public ExamResponseDto processForm1(ExamForm1Dto form) {
        Course course =courseDao.getCourseByTitre(form.getCourse());
        Exam existingExam=examDao.findAllByDateAndSemestereAndSessionAndCourseAndTypeExamAndStartingHour
                (form.getDate(), Semester.valueOf(form.getSemestere())
                ,Session.valueOf(form.getSession())
                ,course,TypeExam.valueOf(form.getTypeExam())
                ,form.getStarting_hour());
        int duration=course.getTypeElement()==TypeElement.ELEMENT ? 90 : 120;
        return existingExam==null ?  new ExamResponseDto(form,duration,course.getNbrStudents()) :null ;
    }
    @Override
    public Exam processForm2(ExamForm2Dto form) {
        List<Exam> exams = examDao.findAllByDateAndStartingHour(
                form.getResponseDto().getExamForm1Dto().getDate(),
                form.getResponseDto().getExamForm1Dto().getStarting_hour()
        );

        List<Salle> salles = getAvailableSalles(exams);

        Surveillance sur = new Surveillance();
        sur = setSalleToSurveillance(sur, salles, form);

        int totalSurveillants = form.getNbrOfSurv() * sur.getSalles().size();
        List<Professor> availableProfs = getAvailableProfs(exams, totalSurveillants);

        List<List<Professor>> groupedProfessors =form.getRandom()?
                groupProfessors(availableProfs,form.getNbrOfSurv()) :
                groupProfessorsByGroup(availableProfs, form.getNbrOfSurv());

        List<SalleAssignment> assignments = assignProfessorsToSalles(salles, groupedProfessors, form.getNbrOfSurv());

        Semester semester = Semester.valueOf(form.getResponseDto().getExamForm1Dto().getSemestere());
        Session session = Session.valueOf(form.getResponseDto().getExamForm1Dto().getSession());
        Course course = courseDao.getCourseByTitre(form.getResponseDto().getExamForm1Dto().getCourse());
        TypeExam typeExam = TypeExam.valueOf(form.getResponseDto().getExamForm1Dto().getTypeExam());
        LocalDate date = form.getResponseDto().getExamForm1Dto().getDate();
        LocalDateTime startingTime = form.getResponseDto().getExamForm1Dto().getStarting_hour();
        int plannedDuration = form.getPlannedDuration();
        Exam newExam = new Exam(semester, session, course, typeExam, date, startingTime, plannedDuration, sur, assignments);
        newExam = examDao.save(newExam);
        for (SalleAssignment assignment : assignments) {
            assignment.setExam(newExam); // Set the exam property of the SalleAssignment object
            salleAssignmentDao.save(assignment);
        }
        if (sur.getExams() == null) {
            sur.setExams(new ArrayList<>());
        }
        sur.getExams().add(newExam);
        surveillanceDao.save(sur);
        surveillanceDao.save(sur);
        return newExam;
    }


    @Override
    public Exam processForm3(Exam exam) {
        return null;
    }
    public List<Salle> getAvailableSalles(List<Exam> exams) {
        List<Salle> allSalles = salleDao.findAll();
        List<Salle> surveilSalles = new ArrayList<>();

        for (Exam exam : exams) {
            surveilSalles.addAll(exam.getExam_surveill().getSalles());
        }

        return allSalles.stream()
                .filter(salle -> !surveilSalles.contains(salle))
                .collect(Collectors.toList());
    }

    public List<Professor> getAvailableProfs(List<Exam> exams, int totalSurveillants) {
        List<Professor> allProfs = professorDao.findAll();
        List<Professor> surveilProfs = new ArrayList<>();

        for (Exam exam : exams) {
            surveilProfs.addAll(exam.getExam_surveill().getSurveil_profs());
        }

        return allProfs.stream()
                .filter(prof -> !surveilProfs.contains(prof))
                .limit(totalSurveillants)
                .collect(Collectors.toList());
    }

    public Surveillance setSalleToSurveillance(Surveillance surv, List<Salle> salles, ExamForm2Dto form) {
        int totalCapacity = 0;
        List<Salle> assignedSalles = new ArrayList<>();

        for (Salle salle : salles) {
            if (totalCapacity >= form.getResponseDto().getNbrStudents()) {
                break;
            }
            assignedSalles.add(salle);
            totalCapacity += salle.getCapacity();
        }

        surv.setSalles(assignedSalles);
        return surv;
    }

    public List<List<Professor>> groupProfessorsByGroup(List<Professor> professors, int n) {
        Map<String, List<Professor>> groupedProfessors = professors.stream()
                .collect(Collectors.groupingBy(professor -> professor.getGroup().getName()));

        List<List<Professor>> result = new ArrayList<>();

        for (Map.Entry<String, List<Professor>> entry : groupedProfessors.entrySet()) {
            List<Professor> groupMembers = entry.getValue();
            for (int i = 0; i < groupMembers.size(); i += n) {
                int end = Math.min(i + n, groupMembers.size());
                result.add(new ArrayList<>(groupMembers.subList(i, end)));
            }
        }

        return result;
    }
    public static List<List<Professor>> groupProfessors(List<Professor> professors, int n) {
        List<List<Professor>> result = new ArrayList<>();

        for (int i = 0; i < professors.size(); i += n) {
            int end = Math.min(i + n, professors.size());
            result.add(new ArrayList<>(professors.subList(i, end)));
        }

        return result;
    }

    public List<SalleAssignment> assignProfessorsToSalles(List<Salle> salles, List<List<Professor>> groupedProfessors, int nbrOfSurv) {
        List<SalleAssignment> assignments = new ArrayList<>();
        int salleIndex = 0;

        // Assign professors from the same group to each salle
        for (List<Professor> professorGroup : groupedProfessors) {
            while (professorGroup.size() >= nbrOfSurv && salleIndex < salles.size()) {
                Salle salle = salles.get(salleIndex++);
                List<Professor> assignedProfs = new ArrayList<>(professorGroup.subList(0, nbrOfSurv));
                professorGroup.subList(0, nbrOfSurv).clear();

                SalleAssignment assignment = new SalleAssignment();
                assignment.setSalle(salle);
                assignment.setProfessors(assignedProfs);
                assignments.add(assignment);

                // Add the assignment to each professor's package
                assignment.getProfessors().forEach(prof -> prof.getAssignments().add(assignment));
            }
        }

        // If there are still salles left, assign any available professors
        List<Professor> remainingProfs = groupedProfessors.stream()
                .flatMap(List::stream)
                .collect(Collectors.toList());

        for (int i = salleIndex; i < salles.size(); i++) {
            Salle salle = salles.get(i);
            List<Professor> assignedProfs = new ArrayList<>();
            for (int j = 0; j < nbrOfSurv &&!remainingProfs.isEmpty(); j++) {
                assignedProfs.add(remainingProfs.remove(0));
            }

            SalleAssignment assignment = new SalleAssignment();
            assignment.setSalle(salle);
            assignment.setProfessors(assignedProfs);
            assignments.add(assignment);

            // Add the assignment to each professor's package
            assignment.getProfessors().forEach(prof -> prof.getAssignments().add(assignment));
        }

        return assignments;
    }
}
