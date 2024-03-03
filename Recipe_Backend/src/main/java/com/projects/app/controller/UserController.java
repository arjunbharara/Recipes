//package com.projects.app.controller;
//
//import java.util.Optional;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.validation.Valid;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.ui.Model;
//import org.springframework.validation.Errors;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.servlet.ModelAndView;
//
//import com.projects.app.exception.UserAlreadyExistException;
//import com.projects.app.model.Recipe;
//import com.projects.app.model.User;
//import com.projects.app.repository.UserRepository;
//import com.projects.app.service.UserService;
//
//@RestController
//@RequestMapping("/user")
//public class UserController {
//
//	@Autowired
//	private UserRepository userRepository;
//
//	@GetMapping("/{id}")
//	public ResponseEntity<?> getUserById(@PathVariable Integer id){
//		return new ResponseEntity<>(userRepository.findById(id), HttpStatus.OK);
//	}
//}
