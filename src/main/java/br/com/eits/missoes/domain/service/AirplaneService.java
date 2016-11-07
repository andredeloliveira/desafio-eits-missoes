package br.com.eits.missoes.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneManufacturer;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.repository.IAirplane;
import br.com.eits.missoes.domain.repository.IAirplaneModel;

@Service
public class AirplaneService {

	@Autowired
	private IAirplane airplanes;
	
	@Autowired
	private IAirplaneModel airplaneModels;
	
	@Transactional
	public void insertAirplane(Airplane airplane) {
		
		
		airplanes.save(airplane);
	}
}
