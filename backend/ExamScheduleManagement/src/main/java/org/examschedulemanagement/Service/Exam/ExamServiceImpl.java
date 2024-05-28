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
    private SemesterDao semesterDao;
    @Autowired
    private SessionDao sessionDao;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private TypeExamDao typeExamDao;
    @Autowired
    private ProfessorDao professorDao;
    @Autowired
    private SalleDao salleDao;
    @Override
    public List<Exam> getAll() {
        return examDao.findAll();
    }

    @Override
    public ExamResponseDto processForm1(ExamForm1Dto form) {
        Semester semester= semesterDao.getSemestersByTitre(form.getSemestere());
        Session session =sessionDao.getSessionByTitre(form.getSession());
        Course course =courseDao.getCourseByTitre(form.getCourse());
        TypeExam typeExam=typeExamDao.getTypeExamByTitre(form.getTypeExam());
        Exam existingExam=examDao.findAllBySemestereAndSessionAndCourseAndTypeExamAndStartingHour(semester,session,course,typeExam,form.getStarting_hour());
        int duration=course.getTypeElement().getTitre().equals("ELEMENT") ? 90 : 120;
        return existingExam==null ? new ExamResponseDto(form,duration,course.getNbrStudents()) : null;
    }

    @Override
    public Exam processForm2(ExamForm2Dto form) {
        Exam exam=examDao.findAllByDateAndStartingHour(form.getResponseDto().getExamForm1Dto().getDate(), form.getResponseDto().getExamForm1Dto().getStarting_hour());
        List<Salle> salles=getAvailableSalles(exam.getExam_surveill());
        Surveillance sur=new Surveillance();
        sur=setSalleToSurveillance(sur,salles,form);
        List<Professor> availableProfs =getAvailableProfs(exam.getExam_surveill(),form.getNbrOfSurv()*sur.getSalles().size());
        sur.setSurveil_profs(availableProfs);
        List<SalleAssignment> assignments=new ArrayList<>();
        List<List<Professor>> groupedProfessors=groupProfessorsByGroup(availableProfs,form.getNbrOfSurv());
        for(List<Professor> professorList : groupedProfessors){
            SalleAssignment assignment=new SalleAssignment();
            assignment.setProfessors(professorList);
        }
        for(Salle s : salles){
            SalleAssignment assignment=new SalleAssignment();
            assignment.setSalle(s);
        }
        Semester semester= semesterDao.getSemestersByTitre(form.getResponseDto().getExamForm1Dto().getSemestere());
        Session session =sessionDao.getSessionByTitre(form.getResponseDto().getExamForm1Dto().getSession());
        Course course =courseDao.getCourseByTitre(form.getResponseDto().getExamForm1Dto().getCourse());
        TypeExam typeExam=typeExamDao.getTypeExamByTitre(form.getResponseDto().getExamForm1Dto().getTypeExam());
        LocalDate date=form.getResponseDto().getExamForm1Dto().getDate();
        LocalDateTime startingTime=form.getResponseDto().getExamForm1Dto().getStarting_hour();
        int plannedDuration=form.getPlannedDuration();
        Exam newExam = new Exam(semester,session,course,typeExam,date,startingTime,plannedDuration,sur,assignments);

        return examDao.save(newExam);
    }

    @Override
    public Exam processForm3(Exam exam) {
        return null;
    }
    public List<Professor> getAvailableProfs(Surveillance surveillance, int i) {
        // Retrieve the list of all professors (assuming this is available from a service or repository)
        List<Professor> allProfs = professorDao.findAll();

        // Get the list of surveillant professors for the given surveillance
        List<Professor> surveilProfs = surveillance.getSurveil_profs();

        // Filter out the surveilProfs from allProfs to get the available professors
        List<Professor> availableProfs = allProfs.stream()
                .filter(prof -> !surveilProfs.contains(prof))
                .limit(i)
                .collect(Collectors.toList());

        return availableProfs;
    }
    public List<Salle> getAvailableSalles(Surveillance surveillance) {
        // Retrieve the list of all professors (assuming this is available from a service or repository)
        List<Salle> AllSalles = salleDao.findAll();

        // Get the list of surveillant professors for the given surveillance
        List<Salle> surveilSalles = surveillance.getSalles();

        // Filter out the surveilProfs from allProfs to get the available professors
        List<Salle> availableSalles = AllSalles.stream()
                .filter(salle -> !surveilSalles.contains(salle))
                .collect(Collectors.toList());

        return availableSalles;
    }
    public Surveillance setSalleToSurveillance(Surveillance surv,List<Salle> salles,ExamForm2Dto form){
        int cpt=0;
        for(Salle s :salles){
            cpt+=s.getCapacity();
            List<Salle> st=surv.getSalles();
            st.add(s);
            surv.setSalles(st);
            if(cpt >=form.getResponseDto().getNbrStudents()){
                break;
            }
        }
        return surv;
    }
    public List<List<Professor>> groupProfessorsByGroup(List<Professor> professors, int n) {
        // Group professors by their group name
        Map<String, List<Professor>> groupedProfessors = new HashMap<>();
        for (Professor professor : professors) {
            groupedProfessors.computeIfAbsent(String.valueOf(professor.getGroup()), k -> new ArrayList<>()).add(professor);
        }

        // Create a list to hold the result
        List<List<Professor>> result = new ArrayList<>();

        // Iterate over each group
        for (Map.Entry<String, List<Professor>> entry : groupedProfessors.entrySet()) {
            List<Professor> groupMembers = entry.getValue();
            // Divide the group members into sublists of size n
            for (int i = 0; i < groupMembers.size(); i += n) {
                int end = Math.min(i + n, groupMembers.size());
                result.add(groupMembers.subList(i, end));
            }
        }

        return result;
    }
}
