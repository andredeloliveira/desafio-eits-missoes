package br.com.eits.missoes.domain.service.airplane;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.repository.airplane.IAirplaneRepository;

@Service
@Configurable
public class AirplaneService {

	@Autowired(required = false)
	private IAirplaneRepository airplaneRepository;
	
	/**
	 * Inserts or update a new Airplane
	 * @param airplane
	 * @return Successfully inserted/updated Airplane
	 */
	@Transactional
	public Airplane insertAirplane(Airplane airplane) {
		return airplaneRepository.saveAndFlush(airplane);
	}
	
	/**
	 * Remove an Airplane
	 * @param airplaneId
	 */
	@Transactional
	public void removeAirplaneById(Long airplaneId) {
		airplaneRepository.delete(airplaneId);
	}
	
	/**
	 * Removes an Airplane
	 * @param airplane
	 */
	@Transactional
	public void removeAirplane(Airplane airplane) {
		airplaneRepository.delete(airplane);
	}
	
	/**
	 * Finds all the Airplane objects in the DB
	 * @return
	 */
	@Transactional 
	public List<Airplane> findAllAirplane() {
		return airplaneRepository.findAll();
	}
	
	/**
	 *  Find a single airplane by its id
	 * @param airplaneId
	 * @return Airplane
	 */
	@Transactional
	public Airplane findAirplaneById(Long airplaneId){
		return airplaneRepository.findAirplaneById(airplaneId);
	}
	
	/**
	 *  Finds  Airplanes by its model
	 * @see AirplaneModel
	 * @param airplaneModel
	 * @return Collection of Airplane
	 */
	@Transactional
	public List<Airplane> findAirplaneByAirplaneModel(AirplaneModel airplaneModel){
		return airplaneRepository.findAirplaneByAirplaneModel(airplaneModel);
	}
	
	/**
	 * Finds an Airplane by its subscription number
	 * @param subscriptionNumber
	 * @return Airplane
	 */
	@Transactional 
	public Airplane findAirplaneBySubscriptionNumber(String subscriptionNumber) {
		return airplaneRepository.findAirplaneBySubscriptionNumber(subscriptionNumber);
	}
	
	/**
	 * Finds an Airplane by the number of seats
	 * @param seatsNumber
	 * @return Airplane
	 */
	@Transactional 
	public Airplane findAirplaneBySeatsNumber(Integer seatsNumber) {
		return airplaneRepository.findAirplaneBySeatsNumber(seatsNumber);
	}
	
	/**
	 *  Searches Airplanes by a search criteria
	 * @param searchQuery
	 * @return Collection of Airplane
	 */
	@Transactional
	public List<Airplane> searchAirplane(String searchQuery) {
		return airplaneRepository.searchAirplane(searchQuery);
	}
}
