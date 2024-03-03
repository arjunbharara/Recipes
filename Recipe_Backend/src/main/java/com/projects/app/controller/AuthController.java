package com.projects.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.app.dto.LoginRequest;
import com.projects.app.dto.LoginResponse;
import com.projects.app.dto.RegisterRequest;
import com.projects.app.exception.UserAlreadyExistsException;
import com.projects.app.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
		try {
			authService.register(registerRequest);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch(UserAlreadyExistsException ex) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest loginRequest) {
	    return authService.login(loginRequest);
	}
	
}