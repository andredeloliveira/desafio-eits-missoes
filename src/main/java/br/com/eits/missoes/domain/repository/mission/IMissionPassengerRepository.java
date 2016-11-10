package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.User;

public interface IMissionPassengerRepository extends JpaRepository<MissionPassenger, Long> {

	MissionPassenger findMissionPassengerById(Long missionPassengerId);
	List<MissionPassenger> findMissionPassengerByUser(User user);
	List<MissionPassenger> findMissionPassengerByMission(Mission mission);
	
}
