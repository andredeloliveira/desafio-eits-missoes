package br.com.eits.missoes.domain.repository.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;

public interface IUserRepository extends JpaRepository<User, Long> {

	User findUserById(Long userId);
	
	User findUserByName(String name);
	
	List<User> findUserByProfile(Profile profile);
	
	Optional<User> findByEmailIgnoreCaseAndStatusTrue(String email);
	
	Optional<User> findByEmailIgnoreCase(String email);
	
	Optional<User> findByEmailIgnoreCaseAndPasswordAndStatusTrue(String email, String password);
	
	/**
	 * It searches an User, by name or email and orders it by status (Active first)
	 * @param searchQuery
	 * @return Collection of Users (with actually only one document, to be better suitable 
	 * on the client-side
	 */
	@Query("FROM users u WHERE u.name like %:searchQuery% or u.email like %:searchQuery% "
			+ "order by u.status DESC")
	List<User> searchUser(@Param("searchQuery")String searchQuery);
	
	@Query("FROM users")
	Page<User> listAllUsers(Pageable pageable);
}
