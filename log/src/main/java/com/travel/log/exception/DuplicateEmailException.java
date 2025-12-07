package com.travel.log.exception;

public class DuplicateEmailException extends RuntimeException {

    private static final String MESSAGE = "이미 존재하는 email 입니다.";

    public DuplicateEmailException(String message) {
        super(message);
    }
    public DuplicateEmailException() {
        super(MESSAGE);
    }

    public DuplicateEmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateEmailException(Throwable cause) {
        super(cause);
    }
}
