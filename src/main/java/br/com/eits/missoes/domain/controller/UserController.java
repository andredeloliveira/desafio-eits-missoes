package br.com.eits.missoes.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.service.user.UserService;

@RestController
public class UserController {

	@Autowired(required = false)
	private UserService userService;
	
	
}
