package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.mission.IMissionPilotRepository;

@Service
@Configurable
public class MissionPilotService  {

	@Autowired(required = false)
	private IMissionPilotRepository missionPilotRepository;
	
	@Transactional
	public MissionPilot insertMissionPilot(MissionPilot missionPilot) {
		return missionPilotRepository.saveAndFlush(missionPilot);
	}
	
	@Transactional
	public MissionPilot findMissionPilotById(Long missionPilotId) {
		return missionPilotRepository.findMissionPilotById(missionPilotId);
	}
	
	@Transactional
	public List<MissionPilot> findMissionPilotByUser(User user) {
		return missionPilotRepository.findMissionPilotByUser(user);
	}
	
	@Transactional
	public List<MissionPilot> findMissionPilotByMission(Mission mission) {
		return missionPilotRepository.findMissionPilotByMission(mission);
	}
	
}
