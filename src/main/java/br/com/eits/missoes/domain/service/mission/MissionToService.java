package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;
import br.com.eits.missoes.domain.entity.MissionTo;
import br.com.eits.missoes.domain.repository.mission.IMissionToRepository;

@Service
@Configurable
public class MissionToService {
  
	@Autowired(required = false)
	private IMissionToRepository missionToRepository;
	
	@Transactional
	public MissionTo insertMissionTo(MissionTo missionTo) {
		return missionToRepository.saveAndFlush(missionTo);
	}
	
	@Transactional
	MissionTo findMissionById(Long missionToId) {
		return missionToRepository.findMissionToById(missionToId);
	}
	
	@Transactional
	List<MissionTo> findAllMissionTo() {
		return missionToRepository.findAll();
	}
	
	@Transactional
	List<MissionTo> findMissionToByAirport(Airport airport) {
		return missionToRepository.findMissionToByAirport(airport);
	}
	
	@Transactional
	List<MissionTo> findMissionToByMission(Mission mission) {
		return missionToRepository.findMIssionByMission(mission);
	}
	
}
