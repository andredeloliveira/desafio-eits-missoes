package br.com.eits.missoes.domain.tests;

import org.directwebremoting.util.SystemOutLoggingOutput;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUserRepository;
import br.com.eits.missoes.domain.service.UserService;
import org.junit.Assert;



public class UserServiceTest extends AbstractIntegrationTest{

	@Autowired(required = false)
	private UserService userService;
	
	@Autowired(required = false)
	private IUserRepository userRepository;
	
	@Test
	public void testInsertMustPass() {
		//create a new user object
		User user = new User();
		user.setName("Eu sou o máximo");
		user.setEmail("eu@sou.com");
		user.setPassword("1235sou");
		user.setStatus("Ativo");
		user.setPerfilAcesso(Profile.ADMINISTRADOR);
		System.out.println(userService);
		User newUser = userService.insertUser(user);
		Assert.assertNotNull(newUser.getStatus());
		
	}
	
}







