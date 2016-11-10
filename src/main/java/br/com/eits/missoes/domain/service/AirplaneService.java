package br.com.eits.missoes.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.repository.IAirplaneRepository;

@Service
@Configurable
public class AirplaneService {

	@Autowired(required = false)
	private IAirplaneRepository airplaneRepository;
	
	/*Insertion related methods*/
	@Transactional
	public Airplane insertAirplane(Airplane airplane) {
		return airplaneRepository.saveAndFlush(airplane);
	}
	
	@Transactional
	public void removeAirplane(Airplane airplane) {
		airplaneRepository.delete(airplane);
	}
	
	/*Find related methods*/
	@Transactional 
	public List<Airplane> findAllAirplane() {
		return airplaneRepository.findAll();
	}
	
	@Transactional
	public Airplane findAirplaneById(Long airplaneId){
		return airplaneRepository.findAirplaneById(airplaneId);
	}
	
	@Transactional
	public List<Airplane> findAirplaneByAirplaneModel(AirplaneModel airplaneModel){
		return airplaneRepository.findAirplaneByAirplaneModel(airplaneModel);
	}
	
	@Transactional 
	public Airplane findAirplaneBySubscriptionNumber(String subscriptionNumber) {
		return airplaneRepository.findAirplaneBySubscriptionNumber(subscriptionNumber);
	}
	
	@Transactional 
	public Airplane findAirplaneBySeatsNumber(Integer seatsNumber) {
		return airplaneRepository.findAirplaneBySeatsNumber(seatsNumber);
	}
}
