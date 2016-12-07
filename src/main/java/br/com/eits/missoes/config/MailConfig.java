package br.com.eits.missoes.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import br.com.eits.missoes.service.mailer.Mailer;

@Configuration
@ComponentScan(basePackageClasses={Mailer.class})
public class MailConfig {
	
	@Bean
	public JavaMailSender mailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.sendgrid.net");
		mailSender.setPort(587);
		mailSender.setUsername("victoblq");
		mailSender.setPassword("ninja300se");
		Properties properties = new Properties();
		properties.put("mail.transport.protocol", "smtp");
		properties.put("mail.smtp.auth", true);
		properties.put("mail.smtp.starttls.enable", true);
		properties.put("mail.debug", false);
		properties.put("mail.smtp.connectiontimeout", 10000);
		mailSender.setJavaMailProperties(properties);
		return mailSender;
	}
}
