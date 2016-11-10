package br.com.eits.missoes.domain.repository.airplane;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;

public interface IAirplaneModelRepository extends JpaRepository<AirplaneModel, Long>{

	AirplaneModel findAirplaneModelById(Long airplaneId);
}
