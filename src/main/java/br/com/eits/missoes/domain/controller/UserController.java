package br.com.eits.missoes.domain.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.security.AppUserDetailService;
import br.com.eits.missoes.domain.service.user.UserService;

@RestController
public class UserController {

	@Autowired(required = false)
	private UserService userService;
	
	@Autowired(required = false)
	private AppUserDetailService userDetailsService;
	
	@RequestMapping(value = "/users", method= RequestMethod.GET)
	List<User> findAllUsers() {
		return userService.findAllUsers();
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	User insertUser(@Valid User user, BindingResult result) {
		if(result.hasErrors()) {
			return null;
		} else {
			return userService.insertUser(user);
		}
	}
	
	//TODO I feel weird having the password being passed in the requestbody.. refactor if sufficient time
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	User login(@RequestBody User user, BindingResult result){
		if (result.hasErrors()) {
			System.out.println(result.getErrorCount());
		}
		return userService.login(user);
	}
	
	
	
}
