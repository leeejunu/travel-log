package com.travel.log.auth;

import com.travel.log.auth.dto.CheckEmailReqDto;
import com.travel.log.auth.dto.SigninReqDto;
import com.travel.log.auth.dto.SignupReqDto;

public interface AuthService {

    void signup(SignupReqDto signupReqDto);

    String signin(SigninReqDto signinReqDto);

    void checkDuplicateEmail(String email);
}
