package br.com.eits.missoes.domain.service;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUserRepository;

@Service
@RemoteProxy
@Configurable
public class UserService implements IUserService{
	
	@Autowired(required = false)
	private IUserRepository users;
	
	
	public User insertUser(User user) {
		return users.save(user);
	}
}
