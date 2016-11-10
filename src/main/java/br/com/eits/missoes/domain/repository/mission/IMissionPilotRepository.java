package br.com.eits.missoes.domain.repository.mission;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.User;

public interface IMissionPilotRepository extends JpaRepository<MissionPilot, Long>{

	MissionPilot findMissionPilotById(Long missionPilotId);
	MissionPilot findMissionPilotByUser(User user);
	MissionPilot findMissionPilotByMission(Mission Mission);
}
