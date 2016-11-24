package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.MissionPlanner;
import br.com.eits.missoes.domain.repository.mission.IMissionPlannerRepository;

@Service
@Configurable
public class MissionPlannerService {
	
	@Autowired(required = false)
	private IMissionPlannerRepository missionPlannerRepository;
	
	@Transactional
	public List<MissionPlanner> findAllMissionPlanner() {
		return missionPlannerRepository.findAll();
	}

}
