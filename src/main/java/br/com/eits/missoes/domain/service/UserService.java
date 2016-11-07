package br.com.eits.missoes.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUser;

@Service
public class UserService {
	
	@Autowired
	private IUser users;
	
	@Transactional
	public void insertUser(User user) {
		users.save(user);
	}
}
