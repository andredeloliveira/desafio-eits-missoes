package br.com.eits.missoes.domain.repository.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;

public interface IUserRepository extends JpaRepository<User, Long> {

	User findUserById(Long userId);
	
	User findUserByName(String name);
	
	List<User> findUserByProfile(Profile profile);
	
	Optional<User> findByEmailIgnoreCaseAndStatusTrue(String email);
	
	Optional<User> findByEmailIgnoreCaseAndPassword(String email, String password);
	
}
