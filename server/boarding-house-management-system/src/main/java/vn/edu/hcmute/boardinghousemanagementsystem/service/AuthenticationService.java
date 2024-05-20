package vn.edu.hcmute.boardinghousemanagementsystem.service;

import vn.edu.hcmute.boardinghousemanagementsystem.dto.LoginDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.RegisterDto;
import vn.edu.hcmute.boardinghousemanagementsystem.dto.UserDto;
import vn.edu.hcmute.boardinghousemanagementsystem.entity.User;

public interface AuthenticationService {
    User register(User newUser);
    User register(UserDto userDto);
    User authenticate(LoginDto input);
}
