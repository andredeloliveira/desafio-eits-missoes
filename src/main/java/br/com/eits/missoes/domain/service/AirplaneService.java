package br.com.eits.missoes.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.repository.IAirplaneRepository;

@Service
@Configurable
public class AirplaneService {

	@Autowired(required = false)
	private IAirplaneRepository airplaneRepository;
	
	@Transactional
	public Airplane insertAirplane(Airplane airplane) {
		return airplaneRepository.saveAndFlush(airplane);
	}
}
