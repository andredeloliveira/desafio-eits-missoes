package br.com.eits.missoes.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.service.airport.AirportService;

@RestController
public class AirportController {

	@Autowired(required = false)
	private AirportService airportService;
	
	
	@RequestMapping(value = "/airports", method = RequestMethod.GET)
	List<Airport> findAllAirport() {
		return airportService.findAllAirport();
	}
}
