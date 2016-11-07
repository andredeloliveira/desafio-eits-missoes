package br.com.eits.missoes.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import br.com.eits.missoes.domain.service.AirplaneService;

@Configuration
@ComponentScan(basePackageClasses = AirplaneService.class)
public class ServiceConfig {

}
