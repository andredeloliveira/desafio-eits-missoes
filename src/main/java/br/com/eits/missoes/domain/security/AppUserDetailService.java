package br.com.eits.missoes.domain.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;


import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.user.IUserRepository;

@Service
public class AppUserDetailService implements UserDetailsService	{

	@Autowired
	private IUserRepository userRepository;

	private Collection<? extends GrantedAuthority> getUserTipo(User user) {
		List<GrantedAuthority> permissoes = new ArrayList<GrantedAuthority>();
		permissoes.add(new SimpleGrantedAuthority("ROLE_"+user.getPerfilAcesso()));
		return permissoes;
	}



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<User> userOptional = userRepository.findByEmailIgnoreCaseAndStatusTrue(email);
		User user = userOptional.orElseThrow( () -> new UsernameNotFoundException("Usuário e/ou senha incorretos"));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new HashSet<>());
	}

	
}
