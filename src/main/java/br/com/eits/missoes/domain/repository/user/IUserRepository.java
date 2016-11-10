package br.com.eits.missoes.domain.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;

public interface IUserRepository extends JpaRepository<User, Long> {

	User findUserById(Long userId);
	
	User findUserByName(String name);
	
	User findUserByProfile(Profile profile);
	
	
}
