package com.travel.log.exception;

import com.travel.log.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // === 1) 이메일 중복 예외 ===
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Result<?>> handleDuplicateEmail(DuplicateEmailException e) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // 409
                .body(new Result<>(e.getMessage(), null));
    }

}
