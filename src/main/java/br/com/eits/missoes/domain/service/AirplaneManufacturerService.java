package br.com.eits.missoes.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import br.com.eits.missoes.domain.entity.AirplaneManufacturer;
import br.com.eits.missoes.domain.repository.IAirplaneManufacturerRepository;

@Service
@Configurable
public class AirplaneManufacturerService {
	
	@Autowired(required = false)
	IAirplaneManufacturerRepository airplaneManufacturerRepository;
	
	List<AirplaneManufacturer> findAllAirplaneManufacturer() {
		return airplaneManufacturerRepository.findAll();
	}
}
