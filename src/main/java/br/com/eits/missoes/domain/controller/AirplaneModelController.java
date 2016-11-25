package br.com.eits.missoes.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.service.airplane.AirplaneModelService;

@RestController
public class AirplaneModelController {
	
	@Autowired(required = false)
	AirplaneModelService airplaneModelService;
	
	@RequestMapping(value = "/airplaneModels", method = RequestMethod.GET)
	public List<AirplaneModel> findAllAirplaneModels() {
		return airplaneModelService.findAllAirplaneModel();
	}
}
