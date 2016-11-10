package br.com.eits.missoes.domain.service.airport;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.repository.airport.IAirportRepository;

@Service
@Configurable
public class AirportService {

	@Autowired(required = false)
	private IAirportRepository airportRepository;
	
	@Transactional
	public Airport findAirportById(Long airportId) {
		return airportRepository.findAirportById(airportId);
	}
	
	@Transactional
	public List<Airport> findAllAirport() {
		return airportRepository.findAll();
	}
	
	@Transactional
	public Airport findAirportByAcronym(String acronym) {
		return airportRepository.findAirportByAcronym(acronym);
	}
	
}
