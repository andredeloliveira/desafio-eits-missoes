package br.com.eits.missoes.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.repository.IAirplaneModelRepository;

@Service
@Configurable
public class AirplaneModelService {

	@Autowired(required = false)
	IAirplaneModelRepository airplaneModelRepository;
	
	@Transactional
	public List<AirplaneModel> findAllAirplaneModel() {
		return airplaneModelRepository.findAll();
	}
}
