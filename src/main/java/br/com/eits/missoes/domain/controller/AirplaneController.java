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

/**
 * Controls all the functionalities that are tied with the entity Airplane
 * @see Airplane
 * @author andre
 *
 */
@RestController
public class AirplaneController {
  
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	/**
	 * Finds all the data related to an Airplane from the database.
	 * @return Collection of Airplane
	 */
	@RequestMapping(value="/airplanes", method = RequestMethod.GET)
	public List<Airplane> findAllAirplanes() {
		return airplaneService.findAllAirplane();
	}
	
	/**
	 * Finds an Airplane from its id
	 * @param airplaneId 
	 * @return
	 */
	@RequestMapping(value = "/airplanes/{id}", method = RequestMethod.GET)
	public Airplane findAirplaneById(@PathVariable("id") Long airplaneId) {
		return airplaneService.findAirplaneById(airplaneId);
	}
	
	/**
	 * Inserts or update a new Airplane record in the database 
	 * @param airplane
	 * @return
	 */
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
	
	/**
	 * Removes an Airplane by its id
	 * @param airplaneId
	 */
	@RequestMapping(value="/airplanes/remove/{id}", method = RequestMethod.DELETE)
	public void removeAirplane(@PathVariable("id") Long airplaneId) {
		airplaneService.removeAirplaneById(airplaneId);
	}
	
	/**
	 * Searches Airplane(s) according to a specified DB Query
	 * @see IAirplaneRepository
	 * @param searchQuery
	 * @return
	 */
	@RequestMapping(value = "/airplanes/search", params={"query"}, method= RequestMethod.GET)
	public List<Airplane> searchAirplane(@RequestParam("query")String searchQuery) {
		return airplaneService.searchAirplane(searchQuery);
	}
}
