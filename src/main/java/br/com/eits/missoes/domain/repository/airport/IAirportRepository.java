package br.com.eits.missoes.domain.repository.airport;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airport;

public interface IAirportRepository extends JpaRepository<Airport, Long>{

	Airport findAirportById(Long airportId);
	Airport findAirportByAcronym(String acronym);
	
	
}
