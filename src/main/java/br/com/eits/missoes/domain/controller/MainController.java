package br.com.eits.missoes.domain.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.eits.missoes.domain.entity.User;



@Controller
public class MainController {

	@RequestMapping("/")
	public String login(User user) {
		return "/index";
	}
	
	
}
