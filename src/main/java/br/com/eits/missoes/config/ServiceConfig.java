package br.com.eits.missoes.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.airport.AirportService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.user.UserService;

@Configuration
@ComponentScan(basePackageClasses = {
  UserService.class,
  AirplaneService.class,
  AirportService.class,
  MissionService.class
})
public class ServiceConfig {

	
}
