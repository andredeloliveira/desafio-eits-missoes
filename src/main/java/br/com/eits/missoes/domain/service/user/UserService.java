package br.com.eits.missoes.domain.service.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.user.IUserRepository;
import br.com.eits.missoes.service.mailer.Mailer;

@Service
@Configurable
public class UserService {
	
	private ShaPasswordEncoder encoder = new ShaPasswordEncoder();
	
	@Autowired(required = false)
	private IUserRepository userRepository;
	
	/*Insert based methods*/
	
	@Transactional
	public User insertUser(User user) {
		if (user.getId() == null) {
		  user.setPassword(encoder.encodePassword(user.getPassword(), "saltOregon"));
		}
		
		return userRepository.saveAndFlush(user);
	}
	
	@Transactional
	public void removeUser(Long id) {
		userRepository.delete(id);
	}
	
	/**/
	
	/*Find based methods*/
	@Transactional
	public List<User> findAllUsers() {
		return userRepository.findAll();
	}
	
	
	@Transactional
	public User findUserByEmail(User user) {
		Optional<User> userOptionalFind = userRepository.findByEmailIgnoreCase(user.getEmail());
		User userFindResponse = userOptionalFind.orElse(null);
		return userFindResponse;
	}
	
	
	@Transactional
	public List<User> findAllPilots() {
		return userRepository.findUserByProfile(Profile.PILOTO);
	}
	
	@Transactional
	public Optional<User> findByEmailIgnoreCaseAndStatusTrue(String email) {
		return userRepository.findByEmailIgnoreCase(email);
	}
	
	@Transactional
	public List<User> findAllPassengers() {
		return userRepository.findUserByProfile(Profile.PASSAGEIRO);
	}

	@Transactional
	public User findUserById(Long userId) {
		return userRepository.findUserById(userId);
	}
	
	@Transactional 
	public List<User> searchUser(String seachQuery) {
		return userRepository.searchUser(seachQuery);
	}
	
	@Transactional
	public User login(User user) {
		user.setPassword(encoder.encodePassword(user.getPassword(), "saltOregon"));
		Optional<User> userOptional = userRepository.findByEmailIgnoreCaseAndPassword(user.getEmail(), user.getPassword());
		User userOptionalResponse = userOptional.orElseThrow(() -> new UsernameNotFoundException("Usuário e/ou senha não encontrados"));
		return userOptionalResponse;
	}

}
	
	
