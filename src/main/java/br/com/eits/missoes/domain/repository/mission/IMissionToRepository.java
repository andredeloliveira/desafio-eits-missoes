package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionTo;

public interface IMissionToRepository extends JpaRepository<MissionTo, Long> {

	MissionTo findMissionToById(Long missionToId);
	List<MissionTo> findMissionToByAirport(Airport airport);
	List<MissionTo> findMIssionByMission(Mission mission);
	
}
