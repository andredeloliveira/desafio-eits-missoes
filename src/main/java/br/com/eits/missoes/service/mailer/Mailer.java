package br.com.eits.missoes.service.mailer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import br.com.eits.missoes.domain.entity.User;

/**
 * It describes how the body of the 'Welcome' e-mail will be
 * @author andre
 * @version 1.0
 */
@Component
public class Mailer {
	
	@Autowired(required = false)
	private JavaMailSender mailSender;
	
	@Async
	public void sendEmail(User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("andre.oliveira@eits.com.br");
		message.setTo(user.getEmail());
		message.setSubject("Cadastro Completo!");
		message.setText(" Seu cadastro foi realizado com sucesso!, Seu usuário é " + user.getEmail());
		mailSender.send(message);
		
	}

}
