package br.com.eits.missoes.domain.service.airplane;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.repository.airplane.IAirplaneModelRepository;

@Service
@Configurable
public class AirplaneModelService {

	@Autowired(required = false)
	IAirplaneModelRepository airplaneModelRepository;
	
	@Transactional
	public List<AirplaneModel> findAllAirplaneModel() {
		return airplaneModelRepository.findAll();
	}
	
	@Transactional
	public AirplaneModel findAirplaneModelById(Long airplaneId) {
		return airplaneModelRepository.findAirplaneModelById(airplaneId);
	}
}
