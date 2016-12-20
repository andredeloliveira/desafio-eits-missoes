package br.com.eits.missoes.domain.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.security.AppUserDetailService;
import br.com.eits.missoes.domain.service.user.UserService;
import br.com.eits.missoes.service.mailer.Mailer;

/**
 * Controls all the User related data
 * @author andre
 * @version 1.0
 */
@RestController
public class UserController {

	@Autowired(required = false)
	private UserService userService;
	
	@Autowired(required = false)
	private AppUserDetailService userDetailsService;
	
	@Autowired(required = false)
	private Mailer mailer;
	
	/**
	 * Gets all the User information from the DB
	 * @return Collection of User
	 */
	@RequestMapping(value = "/users", method= RequestMethod.GET)
	List<User> findAllUsers() {
		return userService.findAllUsers();
	}
	
	/**
	 * finds an User by a given id
	 * @param userId
	 * @return User
	 */
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET) 
	User findUserById(@PathVariable("id") Long userId) {
		return userService.findUserById(userId);
	}
	
	/**
	 * Inserts or Update a User to/in the DB
	 * @param user
	 * @param result
	 * @return Successfully/Error containing User object
	 */
	@RequestMapping(value = "/users/insert", method = RequestMethod.POST)
	ResponseEntity<User> insertUser(@RequestBody User user, BindingResult result) {
		// in case that we are updating... 
		if (user.getId() == null) {
			User hasUser = userService.findUserByEmail(user);
			if (hasUser != null) {
				User responseUser = new User();
				responseUser.setException("E-mail já existente");
				return ResponseEntity.ok(responseUser);
			}
			mailer.sendEmail(user);
		}
		
		
		return ResponseEntity.ok(userService.insertUser(user));
	}
	
	/**
	 * Deactivates/Activates an User
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/users/deactivate/{id}",method = RequestMethod.PUT)
	ResponseEntity<User> deactivateUser(@PathVariable("id") Long userId) {
		try {
			User userTobeDeactivated = userService.deactivateUser(userId);
			return ResponseEntity.ok(userTobeDeactivated);
		} catch (Exception e) {
			User userErrorObject = new User();
			userErrorObject.setException("Ocorreu um erro desativando/ativando o usuário");
			return ResponseEntity.ok(userErrorObject);
		}
	}

	/**
	 * Removes an User by a given id
	 * @param userId
	 */
	@RequestMapping(value= "/users/remove/{id}", method = RequestMethod.DELETE)
	public void removeUser(@PathVariable("id")Long userId) {
		userService.removeUser(userId);
	}
	
	/**
	 * Logs an User in the system, allowing to have different permissions in the System 
	 * @param user
	 * @param result
	 * @return Successfully authorized User
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	ResponseEntity<User>  login(@RequestBody User user, BindingResult result){
		try {
			User userTobeLogged = userService.login(user);
			return ResponseEntity.ok(userTobeLogged);
		} catch (Exception e) {
			User userErrorObject = new User();
			userErrorObject.setException("Usuário e/ou senha Incorretos");
			return ResponseEntity.ok().body(userErrorObject);
		}
	}
	
	/**
	 * Returns the current authorized User
	 * @param user
	 * @return User
	 */
	@RequestMapping(value = "/currentUser", method = RequestMethod.GET)
	public ResponseEntity<User> currentUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User user) {
		System.out.println(user);
		Optional<User> optionalCurrentUser = userService.findUserByUserName(user.getUsername());
		optionalCurrentUser.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		return ResponseEntity.ok(optionalCurrentUser.get());
	}
	
	/**
	 * Searches for an User by a given Query stated at IUsersRepository class
	 * @param searchQuery
	 * @return Collection of User
	 */
	@RequestMapping(value = "/users/search", params={"query"}, method= RequestMethod.GET)
	public List<User> searchUser(@RequestParam("query") String searchQuery) {
		return userService.searchUser(searchQuery);
	}
	
	
	/**
	 *  finds all the User that have the profile as PILOTO (Pilots)
	 *  @see Profile
	 * @return Collection of User
	 */
	@RequestMapping(value = "/users/profile/pilots", method = RequestMethod.GET)
	List<User> findPilots() {
		return userService.findAllPilots();
	}
	
	/**
	 * Finds all the User that have the profile as PASSAGEIRO (Passenger)
	 * @see Profile
	 * @return Collection of User
	 */
	@RequestMapping(value = "/users/profile/passengers", method = RequestMethod.GET)
	List<User> findPassengers(){
		return userService.findAllPassengers();
	}
	
}
