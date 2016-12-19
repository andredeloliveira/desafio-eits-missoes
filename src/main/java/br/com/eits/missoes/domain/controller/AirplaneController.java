package br.com.eits.missoes.domain.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@RequestMapping(value = "/airplanes/{id}", method = RequestMethod.GET)
	public Airplane findAirplaneById(@PathVariable("id") Long airplaneId) {
		return airplaneService.findAirplaneById(airplaneId);
	}
	
	@RequestMapping(value="/airplanes/insert", method = RequestMethod.POST)
	public ResponseEntity<Airplane> insertAirplane(@Valid @RequestBody Airplane airplane) {
		Airplane hasSubscriptionNumber = airplaneService.findAirplaneBySubscriptionNumber(airplane.getSubscriptionNumber());
		if (hasSubscriptionNumber != null) {
			Airplane responseAirplane = new Airplane();
			responseAirplane.setException("Matrícula já existente");
			return ResponseEntity.ok(responseAirplane);
		}
		return ResponseEntity.ok(airplaneService.insertAirplane(airplane));
	}
	
	@RequestMapping(value="/airplanes/remove/{id}", method = RequestMethod.DELETE)
	public void removeAirplane(@PathVariable("id") Long id) {
		airplaneService.removeAirplaneById(id);
	}
	
	@RequestMapping(value = "/airplanes/search", params={"query"}, method= RequestMethod.GET)
	public List<Airplane> searchAirplane(@RequestParam("query")String searchQuery) {
		return airplaneService.searchAirplane(searchQuery);
	}
}
