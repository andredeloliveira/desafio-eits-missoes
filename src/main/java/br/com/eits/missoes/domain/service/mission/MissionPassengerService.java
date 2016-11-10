package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.mission.IMissionPassengerRepository;

@Service
@Configurable
public class MissionPassengerService {

	@Autowired(required = false)
	IMissionPassengerRepository missionPassengerRepository;
	
	@Transactional
	public MissionPassenger insertMissionPassenger(MissionPassenger missionPassenger) {
		return missionPassengerRepository.saveAndFlush(missionPassenger);
	}
	
	@Transactional
	public MissionPassenger findMissionPassengerById(Long missionPassengerId) {
		return missionPassengerRepository.findMissionPassengerById(missionPassengerId);
	}
	
	@Transactional
	public List<MissionPassenger> findMissionPassengerByUser(User user) {
		return missionPassengerRepository.findMissionPassengerByUser(user);
	}
	
	@Transactional
	public List<MissionPassenger> findMissionPassengerByMission(Mission mission) {
		return missionPassengerRepository.findMissionPassengerByMission(mission);
	}
}
