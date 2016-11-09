package br.com.eits.missoes.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.IUserRepository;
import br.com.eits.missoes.domain.service.UserService;

@Configuration
@ComponentScan(basePackageClasses = UserService.class)
public class ServiceConfig {

	
}
