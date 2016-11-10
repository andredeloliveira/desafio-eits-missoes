package br.com.eits.missoes.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;

public interface IAirplaneRepository extends JpaRepository<Airplane, Long>{

	Airplane findAirplaneById(Long airplaneId);
	List<Airplane> findAirplaneByAirplaneModel(AirplaneModel airplaneModel);
	Airplane findAirplaneBySubscriptionNumber(String subscriptionNumber);
	Airplane findAirplaneBySeatsNumber(Integer seatsNumber);
	
}
