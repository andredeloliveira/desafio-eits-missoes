package br.com.eits.missoes.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.airport.AirportService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.user.UserService;
import br.com.eits.missoes.service.mailer.Mailer;
/**
 * <p>
 * 	Scan all services provided by the system
 * </p>
 * @author andre
 * @version 1.0
 */
@Configuration
@ComponentScan(basePackageClasses = {
  UserService.class,
  AirplaneService.class,
  AirportService.class,
  MissionService.class,
  Mailer.class,
})
public class ServiceConfig {

	
}
