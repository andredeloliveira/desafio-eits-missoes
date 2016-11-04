package br.com.eits.missoes.config;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
//@ComponentScan(basePackageClasses = {  })
@EnableWebMvc
public class WebConfig extends WebMvcConfigurationSupport implements ApplicationContextAware {

	private ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) {
		// TODO Auto-generated method stub
		this.applicationContext = applicationContext;
	}
}
