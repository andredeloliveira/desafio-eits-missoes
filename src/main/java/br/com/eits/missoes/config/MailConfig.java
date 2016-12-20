package br.com.eits.missoes.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import br.com.eits.missoes.service.mailer.Mailer;

/**
 * It configures all the data for the e-mail sending functionality.
 * @see JavaMailSender
 * @author andre
 * @version 1.0
 */
@Configuration
@ComponentScan(basePackageClasses={Mailer.class})
public class MailConfig {
	
	/**
	 * Sends e-mail with the configuration that the method itself uses. All the data
	 * comes from an env. file
	 * @return An object that will be able to send any given message when evoked.
	 */
	@Bean
	public JavaMailSender mailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.sendgrid.net");
		mailSender.setPort(587);
		mailSender.setUsername("andredeloliveira");
		mailSender.setPassword("eitsdesafio123");
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
