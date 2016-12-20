package br.com.eits.missoes.domain.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.eits.missoes.domain.entity.User;



/**
 * The main controller is responsible only for the mapping for index file coming from the
 * front-end(client) side. It will render whatever it is in the index.html file
 * @author andre
 * @version 1.0
 */
@Controller
public class MainController {

	@RequestMapping("/")
	public String login(User user) {
		return "/index";
	}
	
	
}
