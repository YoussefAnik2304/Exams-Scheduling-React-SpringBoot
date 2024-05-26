package org.examschedulemanagement.Security;

import jakarta.persistence.EntityNotFoundException;
import org.examschedulemanagement.Dao.AdminDao;
import org.examschedulemanagement.Dao.PersonnelDao;
import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Personnel;
import org.examschedulemanagement.Entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private PersonnelDao personnelDao;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Personnel personnel=personnelDao.getPersonnelByEmail(email).orElseThrow(() -> new EntityNotFoundException("user not found"));
        return new User(personnel.getEmail(),personnel.getPassword(),mapRolesToAuthorities(personnel.getRoles()));
    }
    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }
}
