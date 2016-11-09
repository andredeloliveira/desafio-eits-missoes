package br.com.eits.missoes.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;

public interface IUserRepository extends JpaRepository<User, Integer> {

	User findUserById(Long userId);
	
	User findUserByName(String name);
	
	User findUserByProfile(Profile profile);
	
	
}
