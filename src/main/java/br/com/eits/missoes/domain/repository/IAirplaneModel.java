package br.com.eits.missoes.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.AirplaneModel;

public interface IAirplaneModel extends JpaRepository<AirplaneModel, Integer> {
	
	Optional<AirplaneModel> findByIdAirplaneModel(Integer idAirplaneModel);
}
