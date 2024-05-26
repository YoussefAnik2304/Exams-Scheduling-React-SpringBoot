package org.examschedulemanagement.Controllers;

import org.examschedulemanagement.Dao.AdminDao;
import org.examschedulemanagement.Dao.PersonnelDao;
import org.examschedulemanagement.Dao.ProfessorDao;
import org.examschedulemanagement.Dao.RoleDao;
import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.Professor;
import org.examschedulemanagement.Entities.Role;
import org.examschedulemanagement.Security.AuthResponseDTO;
import org.examschedulemanagement.Security.JwtGenerator;
import org.examschedulemanagement.Security.LoginDto;
import org.examschedulemanagement.Security.RegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@Controller
@RequestMapping("/Auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private AdminDao adminDao;
    private PersonnelDao personnelDao;
    private ProfessorDao professorDao;
    private RoleDao roleDao;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;
    @Autowired
    public AuthController(JwtGenerator jwtGenerator,AuthenticationManager authenticationManager, AdminDao adminDao, PersonnelDao personnelDao, ProfessorDao professorDao, RoleDao roleDao, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.adminDao = adminDao;
        this.personnelDao = personnelDao;
        this.professorDao = professorDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator=jwtGenerator;
    }
    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = auth.getName();
        System.out.println("Current user: " + currentPrincipalName +"\n"+ auth.getAuthorities()+"\n"+auth.getCredentials());
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (personnelDao.existsByEmail(registerDto.getUsername())) {
            return new ResponseEntity<>("email is taken!", HttpStatus.BAD_REQUEST);
        }
        if(registerDto.getRole().equals("ADMIN")) {
            Admin admin = new Admin();
            admin.setEmail(registerDto.getUsername());
            admin.setPassword(passwordEncoder.encode((registerDto.getPassword())));

            Role roles = roleDao.findByName("ADMIN").get();
            admin.setRoles(Collections.singletonList(roles));

            adminDao.save(admin);

        }else {
            Professor professor = new Professor();
            professor.setEmail(registerDto.getUsername());
            professor.setPassword(passwordEncoder.encode((registerDto.getPassword())));

            Role roles = roleDao.findByName("PROFESSOR").get();
            professor.setRoles(Collections.singletonList(roles));

            professorDao.save(professor);
        }
            return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }
}

