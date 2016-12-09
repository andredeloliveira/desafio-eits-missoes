package br.com.eits.missoes.domain.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.security.AppUserDetailService;
import br.com.eits.missoes.domain.service.user.UserService;
import br.com.eits.missoes.service.mailer.Mailer;

@RestController
public class UserController {

	@Autowired(required = false)
	private UserService userService;
	
	@Autowired(required = false)
	private AppUserDetailService userDetailsService;
	
	@Autowired(required = false)
	private Mailer mailer;
	
	@RequestMapping(value = "/users", method= RequestMethod.GET)
	List<User> findAllUsers() {
		return userService.findAllUsers();
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET) 
	User findUserById(@PathVariable("id") Long userId) {
		return userService.findUserById(userId);
	}
	
	@RequestMapping(value = "/users/insert", method = RequestMethod.POST)
	User insertUser(@RequestBody User user, BindingResult result) {
		if (user.getId() == null) {
			mailer.sendEmail(user);
		}
		return userService.insertUser(user);
	}

	@RequestMapping(value= "/users/remove/{id}", method = RequestMethod.DELETE)
	public void removeUser(@PathVariable("id")Long id) {
		userService.removeUser(id);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	User login(@RequestBody User user, BindingResult result){
		return userService.login(user);
	}
	
	@RequestMapping(value = "/users/profile/pilots", method = RequestMethod.GET)
	List<User> findPilots() {
		return userService.findAllPilots();
	}
	
	@RequestMapping(value = "/users/profile/passengers", method = RequestMethod.GET)
	List<User> findPassengers(){
		return userService.findAllPassengers();
	}
	
}
