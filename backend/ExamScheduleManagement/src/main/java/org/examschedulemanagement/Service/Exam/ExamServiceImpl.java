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
    private SurveillanceDao surveillanceDao;

    @Override
    public List<Exam> getAll() {
        return examDao.findAll();
    }

    @Override
    public ExamResponseDto processForm1(ExamForm1Dto form) {
        Course course = courseDao.getCourseByTitre(form.getCourse());
        Exam existingExam = examDao.findAllByDateAndSemestereAndSessionAndCourseAndTypeExamAndStartingHour
                (form.getDate(), Semester.valueOf(form.getSemestere())
                        , Session.valueOf(form.getSession())
                        , course, TypeExam.valueOf(form.getTypeExam())
                        , form.getStarting_hour());
        int duration = course.getTypeElement() == TypeElement.ELEMENT ? 90 : 120;
        return existingExam == null ? new ExamResponseDto(form, duration, course.getNbrStudents()) : null;
    }

    @Override
    public Exam processForm2(ExamForm2Dto form) {
        List<Exam> exams = examDao.findAllByDateAndStartingHour(
                form.getResponseDto().getExamForm1Dto().getDate(),
                form.getResponseDto().getExamForm1Dto().getStarting_hour()
        );

        List<Salle> salles = getAvailableSalles(exams,form.getResponseDto().getNbrStudents());

        int totalSurveillants = form.getNbrOfSurv() * salles.size();
        List<Professor> availableProfs = getAvailableProfs(exams, totalSurveillants);

        List<List<Professor>> groupedProfessors;
        if (form.getRandom()) {
            groupedProfessors = groupProfessorsRandomly(availableProfs, form.getNbrOfSurv(), salles.size());
        } else {
            groupedProfessors = groupProfessorsByGroup(availableProfs, form.getNbrOfSurv(), salles.size());
        }
        Admin available_Admin=getAvailableAdmin();

        // Create surveillance objects with assigned salles and professors
        List<Surveillance> surveillances = new ArrayList<>();
        for (int i = 0; i < salles.size(); i++) {
            Surveillance surveillance = new Surveillance();
            surveillance.setSalle(salles.get(i));
            surveillance.setSurveil_profs(groupedProfessors.get(i));
            surveillances.add(surveillance);
        }

        // Create exam object with assigned surveillances
        Semester semester = Semester.valueOf(form.getResponseDto().getExamForm1Dto().getSemestere());
        Session session = Session.valueOf(form.getResponseDto().getExamForm1Dto().getSession());
        Course course = courseDao.getCourseByTitre(form.getResponseDto().getExamForm1Dto().getCourse());
        TypeExam typeExam = TypeExam.valueOf(form.getResponseDto().getExamForm1Dto().getTypeExam());
        LocalDate date = form.getResponseDto().getExamForm1Dto().getDate();
        LocalDateTime startingTime = form.getResponseDto().getExamForm1Dto().getStarting_hour();
        int plannedDuration = form.getPlannedDuration();
        Exam newExam = new Exam(semester, session, course, typeExam, date, startingTime, plannedDuration);
        newExam.setExam_surveill(surveillances);
        newExam = examDao.save(newExam);
        return newExam;
    }

    private List<Salle> getAvailableSalles(List<Exam> exams, int nbrStudents) {
        List<Salle> allSalles = salleDao.findAll();
        List<Salle> surveilSalles = new ArrayList<>();

        for (Exam exam : exams) {
            surveilSalles.addAll(exam.getExam_surveill().stream().map(Surveillance::getSalle).collect(Collectors.toList()));
        }

        List<Salle> availableSalles = allSalles.stream()
                .filter(salle ->!surveilSalles.contains(salle))
                .toList();

        List<Salle> minSalles = new ArrayList<>();
        int totalCapacity = 0;

        for (Salle salle : availableSalles) {
            totalCapacity += salle.getCapacity();
            minSalles.add(salle);
            if (totalCapacity >= nbrStudents) {
                break;
            }
        }

        return minSalles;
    }

    private List<Professor> getAvailableProfs(List<Exam> exams, int totalSurveillants) {
        List<Professor> allProfs = professorDao.findAll();
        List<Professor> surveilProfs = new ArrayList<>();

        for (Exam exam : exams) {
            surveilProfs.addAll(exam.getExam_surveill().
                    stream().
                    flatMap(surveillance -> surveillance.getSurveil_profs().stream())
                    .toList());
        }

        List<Professor> availableProfs = allProfs.stream()
                .filter(prof -> !surveilProfs.contains(prof))
                .collect(Collectors.toList());

        if (availableProfs.size() < totalSurveillants) {
            throw new IllegalStateException("Il n'y a pas assez de professeurs disponibles pour cette épreuve.");
        }

        return availableProfs;
    }

    private List<List<Professor>> groupProfessorsRandomly(List<Professor> availableProfs, int nbrOfSurv, int nbrOfSalles) {
        List<List<Professor>> groupedProfessors = new ArrayList<>();

        int index = 0;
        for (int i = 0; i < nbrOfSalles; i++) {
            List<Professor> groupedProfs = new ArrayList<>();
            for (int j = 0; j < nbrOfSurv && index < availableProfs.size(); j++) {
                groupedProfs.add(availableProfs.get(index));
                index++;
            }
            groupedProfessors.add(groupedProfs);
        }

        return groupedProfessors;
    }

    public List<List<Professor>> groupProfessorsByGroup(List<Professor> professors, int n, int nbrOfSalles) {
        Map<String, List<Professor>> groupedProfessors = professors.stream()
                .collect(Collectors.groupingBy(professor -> professor.getGroup().getName()));

        List<List<Professor>> result = new ArrayList<>();

        int count = 0;
        for (Map.Entry<String, List<Professor>> entry : groupedProfessors.entrySet()) {
            List<Professor> groupMembers = entry.getValue();
            for (int i = 0; i < groupMembers.size(); i += n) {
                int end = Math.min(i + n, groupMembers.size());
                result.add(new ArrayList<>(groupMembers.subList(i, end)));
                count++;
                if (count == nbrOfSalles) {
                    break;
                }
            }
            if (count == nbrOfSalles) {
                break;
            }
        }

        if (result.size() < nbrOfSalles) {
            List<Professor> remainingProfs = new ArrayList<>(professors);
            remainingProfs.removeAll(result.stream().flatMap(List::stream).toList());
            result.addAll(groupProfessorsRandomly(remainingProfs, n, nbrOfSalles - result.size()));
        }

        return result;
    }
}