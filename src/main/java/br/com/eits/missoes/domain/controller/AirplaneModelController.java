package br.com.eits.missoes.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.service.airplane.AirplaneModelService;

/**
 * Controls all the AirplaneModel related data.
 * @author andre
 * @version 1.0
 */
@RestController
public class AirplaneModelController {
	
	@Autowired(required = false)
	AirplaneModelService airplaneModelService;
	
	/**
	 * Gets all the data related to AirplaneModels that are in the DB
	 * @return Collection of AirplaneModel
	 * @see AirplaneModel
	 */
	@RequestMapping(value = "/airplaneModels", method = RequestMethod.GET)
	public List<AirplaneModel> findAllAirplaneModels() {
		return airplaneModelService.findAllAirplaneModel();
	}
}
