package br.com.eits.missoes.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUserRepository;

@Service
@Configurable
public class UserService {
	
	@Autowired(required = false)
	private IUserRepository users;
	
	@Transactional
	public User insertUser(User user) {
		return users.saveAndFlush(user);
	}
	
	@Transactional
	public List<User> findAllUsers() {
		return users.findAll();
	}
	
	@Transactional
	public User findUser(String name, Profile profile) {
		if (name != null) {
			return users.findUserByName(name);
		} else if (profile != null) {
			return users.findUserByProfile(profile);
		}
		return null;
	}

	
	
}
