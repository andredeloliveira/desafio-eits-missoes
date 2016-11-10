package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.User;

public interface IMissionPilotRepository extends JpaRepository<MissionPilot, Long>{

	MissionPilot findMissionPilotById(Long missionPilotId);
	List<MissionPilot> findMissionPilotByUser(User user);
	List<MissionPilot> findMissionPilotByMission(Mission mission);
}
