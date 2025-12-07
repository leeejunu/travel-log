package com.travel.log.auth;

import com.travel.log.Result;
import com.travel.log.auth.dto.CheckEmailReqDto;
import com.travel.log.auth.dto.SigninReqDto;
import com.travel.log.auth.dto.SignupReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupReqDto signupReqDto) {
        authService.signup(signupReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Result<>("회원가입 성공", null));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninReqDto signinReqDto) {
        String token = authService.signin(signinReqDto);
        return ResponseEntity.ok(new Result<>("로그인 성공", token));
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody CheckEmailReqDto checkEmailReqDto) {
        authService.checkDuplicateEmail(checkEmailReqDto.getEmail());
        return ResponseEntity.ok().body(new Result<>("사용 가능한 이메일입니다.", true));
    }

}
