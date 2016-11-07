package br.com.eits.missoes.domain.tests;

import org.directwebremoting.util.SystemOutLoggingOutput;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUser;
import br.com.eits.missoes.domain.service.UserService;
import junit.framework.Assert;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/context.xml"})
public class UserServiceTest {

	@Autowired
	private UserService userService;
	
	@Test
	public void testInsert() {
		//create a new user object
		User user = new User();
		user.setName("Eu sou o máximo");
		user.setEmail("eu@sou.com");
		user.setPassword("1235sou");
		user.setPerfilAcesso(Profile.ADMINISTRADOR);
		userService.insertUser(user);
		System.out.println(user);
		
	}
}







