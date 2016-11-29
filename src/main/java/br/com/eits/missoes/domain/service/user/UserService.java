package br.com.eits.missoes.domain.service.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.user.IUserRepository;

@Service
@Configurable
public class UserService {
	
	private ShaPasswordEncoder encoder = new ShaPasswordEncoder();
	
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
	
	//TODO find a better way of showing an error. 500 seems too abstract to the user
	@Transactional
	public User login(User user) {
		user.setPassword(encoder.encodePassword(user.getPassword(), "saltOregon"));
		Optional<User> userOpt = userRepository.findByEmailIgnoreCaseAndPassword(user.getEmail(), user.getPassword());
		User nuser = userOpt.orElseThrow(()-> new UsernameNotFoundException("Usuário ou senha não encontrado"));
		return nuser;
	}
	
}
