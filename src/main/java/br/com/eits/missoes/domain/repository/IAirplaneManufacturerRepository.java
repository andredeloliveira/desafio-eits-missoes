package br.com.eits.missoes.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.AirplaneManufacturer;

public interface IAirplaneManufacturerRepository extends JpaRepository<AirplaneManufacturer, Long>{

}
