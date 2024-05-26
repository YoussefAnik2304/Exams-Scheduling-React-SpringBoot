package org.examschedulemanagement.Security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
    String username;
    String password;
    String role;
}
