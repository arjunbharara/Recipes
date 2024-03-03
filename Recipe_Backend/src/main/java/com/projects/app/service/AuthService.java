package com.projects.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projects.app.dto.LoginRequest;
import com.projects.app.dto.LoginResponse;
import com.projects.app.dto.RegisterRequest;
import com.projects.app.exception.UserAlreadyExistsException;
import com.projects.app.jwt.JwtProvider;
import com.projects.app.model.User;
import com.projects.app.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtProvider jwtProvider;
	
	private boolean usernameExists(String username) {
    	return userRepository.findByUsername(username).isEmpty() == false;
    }
	
	public void register(RegisterRequest registerRequest) throws UserAlreadyExistsException {
		if(usernameExists(registerRequest.getUsername())) {
			throw new UserAlreadyExistsException("There is an account with that username: "
                    +  registerRequest.getUsername());
		}
		User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        userRepository.save(user);
	}
	
	public LoginResponse login(LoginRequest loginRequest) {
		Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
				(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		return new LoginResponse(jwtProvider.generateToken(authenticate), loginRequest.getUsername());
	}
	
	public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
		org.springframework.security.core.userdetails.User principal = 
				(org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return Optional.of(principal);
	}
	
//	public Optional<CustomUser> getCurrentUser() {
//		CustomUser principal = 
//				(CustomUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		return Optional.of(principal);
//	}
	
}
