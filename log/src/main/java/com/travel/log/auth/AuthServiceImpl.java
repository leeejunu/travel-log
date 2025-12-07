package com.travel.log.auth;

import com.travel.log.auth.dto.SigninReqDto;
import com.travel.log.exception.DuplicateEmailException;
import com.travel.log.security.JwtTokenProvider;
import com.travel.log.user.User;
import com.travel.log.auth.dto.SignupReqDto;
import com.travel.log.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public void signup(SignupReqDto signupReqDto) {

        String email = signupReqDto.getEmail();
        String encodePassword = passwordEncoder.encode(signupReqDto.getPassword());

        checkDuplicateEmail(email);

        User createUser = User.createUser(email, encodePassword);
        userRepository.save(createUser);
    }

    @Override
    public String signin(SigninReqDto signinReqDto) {
        String email = signinReqDto.getEmail();
        User findUser = userRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("존재하지 않는 회원입니다."));
        boolean matches = passwordEncoder.matches(signinReqDto.getPassword(), findUser.getPassword());

        if (!matches) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return jwtTokenProvider.createToken(findUser.getEmail());
    }


    @Override
    public void checkDuplicateEmail(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            throw new DuplicateEmailException();
        });
    }
}
