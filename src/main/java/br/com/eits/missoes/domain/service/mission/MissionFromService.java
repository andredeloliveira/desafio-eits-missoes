package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;
import br.com.eits.missoes.domain.repository.mission.IMissionFromRepository;

@Service
@Configurable
public class MissionFromService {

	@Autowired(required = false)
	private IMissionFromRepository missionFromRepository;
	
	@Transactional
	public List<MissionFrom> findAllMissionFrom() {
		return missionFromRepository.findAll();
	}
	
	@Transactional
	public MissionFrom insertMissionFrom(MissionFrom missionFrom) {
		return missionFromRepository.saveAndFlush(missionFrom);
	}
	
	@Transactional
	public MissionFrom findMissionFromById(Long missionFromId) {
		return missionFromRepository.findOne(missionFromId);
	} 
	
	@Transactional
	public List<MissionFrom> findMissionFromByAirport(Airport airport) {
		return missionFromRepository.findMissionFromByAirport(airport);
	}
	
	@Transactional
	public List<MissionFrom> findMissionFromByMission(Mission mission) {
		return missionFromRepository.findMissionFromByMission(mission);
	}
	
}
