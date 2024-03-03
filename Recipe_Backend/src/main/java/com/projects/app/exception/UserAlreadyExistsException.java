package com.projects.app.exception;

public class UserAlreadyExistsException extends RuntimeException{

	private static final long serialVersionUID = 1531138974924655887L;

	public UserAlreadyExistsException(String message) {
		super(message);
	}
	
	public UserAlreadyExistsException(Throwable error) {
		super(error);
	}
	
	public UserAlreadyExistsException(String message, Throwable error) {
		super(message, error);
	}
	
	public UserAlreadyExistsException() {
		super("User already exists");
	}
}
