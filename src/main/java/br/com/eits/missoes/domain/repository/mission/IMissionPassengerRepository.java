package br.com.eits.missoes.domain.repository.mission;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.User;

public interface IMissionPassengerRepository extends JpaRepository<MissionPassenger, Long> {

	MissionPassenger findMissionPassengerById(Long missionPassengerId);
	MissionPassenger findMissionPassengerByUser(User user);
	MissionPassenger findMissionPassengerByMission(Mission mission);
	
}
