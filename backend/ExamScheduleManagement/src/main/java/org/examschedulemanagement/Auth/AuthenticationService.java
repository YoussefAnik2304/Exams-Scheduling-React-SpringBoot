package org.examschedulemanagement.Auth;


import lombok.RequiredArgsConstructor;
import org.examschedulemanagement.Dao.AdminDao;
import org.examschedulemanagement.Dao.PersonnelDao;
import org.examschedulemanagement.Dao.ProfessorDao;
import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.Professor;
import org.examschedulemanagement.Security.JwtService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final AdminDao adminDao;

  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  public AuthenticationResponse register(RegisterRequest request) {
    // Create an Admin object
   /* Admin admin = (Admin) Admin.builder()
            .firstName(request.getFirstname())
            .lastName(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();
*/
    Admin admin=new Admin(request.getFirstName(),
            request.getLastName(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword())
            );
    // Save the Admin object
    Admin savedAdmin = adminDao.save(admin);

    // Generate JWT token for the saved Admin
    String jwtToken = jwtService.generateToken(savedAdmin);

    // Return the authentication response with the JWT token
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .build();
  }


  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    try {
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      request.getEmail(),
                      request.getPassword()
              )
      );
    } catch (AuthenticationException e) {
      // Handle authentication failure
      // For example, return an error response indicating invalid credentials
      return AuthenticationResponse.builder()
              .errorMessage(e.getMessage()+'\n'+e.getLocalizedMessage())
              .build();
    }

    // Authentication successful, retrieve the authenticated user
    Admin admin = adminDao.getAdminByEmail(request.getEmail()).orElseThrow();

    // Verify that the authenticated user is an admin

    // Generate JWT token for the authenticated admin
    String jwtToken = jwtService.generateToken(admin);

    // Return the authentication response with the JWT token
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .build();
  }


}
