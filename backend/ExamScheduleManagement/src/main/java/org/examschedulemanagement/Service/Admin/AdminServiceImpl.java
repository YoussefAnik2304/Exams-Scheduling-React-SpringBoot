package org.examschedulemanagement.Service.Admin;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.examschedulemanagement.Dao.AdminDao;
import org.examschedulemanagement.Entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminDao adminDao;
    public boolean Exists(String email) {
        return adminDao.existsAdminByEmail(email);
    }



    @Override
    public Admin addAdmin(Admin admin) {
        if(Exists(admin.getEmail()))
            return null;
        return adminDao.save(admin);
    }

    @Override
    public Admin updateAdmin(Long id,Admin admin) {
        Admin admintoupdate=adminDao.findById(id).orElseThrow(() ->new EntityNotFoundException("admin to update not found "));
        admintoupdate.setEmail(admin.getEmail());
        admintoupdate.setPassword(admin.getPassword());
        admintoupdate.setFirstName(admin.getFirstName());
        admintoupdate.setLastName(admin.getLastName());
        return adminDao.save(admintoupdate);

    }

    @Override
    public Admin deleteAdmin(Admin admin) {
        adminDao.delete(admin);
        return admin ;
    }

    @Override
    public List<Admin> getAllAdmins() {
        return (List<Admin>) adminDao.findAll();
    }


}
