package org.examschedulemanagement.Service.Admin;

import org.examschedulemanagement.Entities.Admin;
import org.examschedulemanagement.Entities.Professor;

import java.util.List;

public interface AdminService {
    boolean Exists(String email);
    boolean CredentielsCheck(Admin admin );
    Admin addAdmin(Admin admin);
    Admin updateAdmin(Long id,Admin admin);
    Admin deleteAdmin (Admin admin );
    List<Admin> getAllAdmins();
}
