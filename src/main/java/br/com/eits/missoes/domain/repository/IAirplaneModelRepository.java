package br.com.eits.missoes.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.AirplaneModel;

public interface IAirplaneModelRepository extends JpaRepository<AirplaneModel, Long>{

}
