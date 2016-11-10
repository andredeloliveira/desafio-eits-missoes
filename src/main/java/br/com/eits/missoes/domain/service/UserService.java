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
	private IUserRepository userRepository;
	
	/*Insert based methods*/
	
	@Transactional
	public User insertUser(User user) {
		return userRepository.saveAndFlush(user);
	}
	
	@Transactional
	public void removeUser(User user) {
		userRepository.delete(user);
	}
	
	/**/
	
	/*Find based methods*/
	@Transactional
	public List<User> findAllUsers() {
		return userRepository.findAll();
	}
	
	@Transactional
	public User findUser(String name, Profile profile) {
		if (name != null) {
			return userRepository.findUserByName(name);
		} else if (profile != null) {
			return userRepository.findUserByProfile(profile);
		}
		return null;
	}

	@Transactional
	public User findUserById(Long userId) {
		return userRepository.findUserById(userId);
	}
	
	
}
