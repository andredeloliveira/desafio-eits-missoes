package br.com.eits.missoes.domain.tests.user;

import java.util.List;


import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.eits.missoes.domain.entity.Profile;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.user.IUserRepository;
import br.com.eits.missoes.domain.service.user.UserService;
import br.com.eits.missoes.domain.tests.AbstractIntegrationTest;

import org.junit.Assert;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;


public class UserServiceTest extends AbstractIntegrationTest{

	public static final String CLEAN_DATASET = "classpath:datasets/AbstractDataset.xml";
	public static final String USERS_DATASET = "classpath:datasets/UsersDataset.xml";
	
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
		user.setStatus(true);
		user.setPerfilAcesso(Profile.ADMINISTRADOR);
		User newUser = userService.insertUser(user);
		final User newUserX = userRepository.findUserById(user.getId());
		Assert.assertNotNull(newUserX.getName());
		
		
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {USERS_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testRemoveUser() {
		User user = userService.findUserById(new Long(1));
		userService.removeUser(user.getId());
		List<User> users = userService.findAllUsers();
		Assert.assertEquals(2, users.size());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {USERS_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testFindAllUsers() {
		List<User> users = userService.findAllUsers();
		Assert.assertNotNull(users);
		Assert.assertEquals(3, users.size());
	}
	
	
}







