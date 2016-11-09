package br.com.eits.missoes.domain.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.User;

public interface IUserService {

	
	User insertUser(User user);
	List<User> findAllUsers();
	List<User> findUser();
	
}
