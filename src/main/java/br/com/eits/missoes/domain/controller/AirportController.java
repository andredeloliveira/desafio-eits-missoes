package br.com.eits.missoes.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.service.airport.AirportService;

/**
 * Controls all the Airport related data.
 * @author andre
 * @version 1.0
 */
@RestController
public class AirportController {

	@Autowired(required = false)
	private AirportService airportService;
	
	/**
	 * Gets all the data related to AirplaneModels that are in the DB
	 * @return Collection of Airport
	 * @see Airport
	 */
	@RequestMapping(value = "/airports", method = RequestMethod.GET)
	List<Airport> findAllAirport() {
		return airportService.findAllAirport();
	}
}
