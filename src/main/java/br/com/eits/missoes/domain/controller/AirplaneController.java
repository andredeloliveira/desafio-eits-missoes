package br.com.eits.missoes.domain.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;

@RestController
public class AirplaneController {
  
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	@RequestMapping(value="/airplanes", method = RequestMethod.GET)
	public List<Airplane> findAllAirplanes() {
		return airplaneService.findAllAirplane();
	}
	
	@RequestMapping(value="/airplanes", method = RequestMethod.POST)
	public Airplane insertAirplane(@Valid Airplane airplane, BindingResult result) {
		if (result.hasErrors()) {
			return null;
		} else {
			return airplaneService.insertAirplane(airplane);
		}
	}
}
