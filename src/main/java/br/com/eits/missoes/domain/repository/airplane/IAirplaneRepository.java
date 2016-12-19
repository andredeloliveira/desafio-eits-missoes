package br.com.eits.missoes.domain.repository.airplane;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;

public interface IAirplaneRepository extends JpaRepository<Airplane, Long>{

	Airplane findAirplaneById(Long airplaneId);
	List<Airplane> findAirplaneByAirplaneModel(AirplaneModel airplaneModel);
	Airplane findAirplaneBySubscriptionNumber(String subscriptionNumber);
	Airplane findAirplaneBySeatsNumber(Integer seatsNumber);
	
	@Query("FROM airplane a WHERE a.airplaneModel.name like %:searchQuery%"
			+ " or a.airplaneModel.airplaneManufacturer.name like %:searchQuery%")
	List<Airplane> searchAirplane(@Param("searchQuery") String searchQuery);
}
