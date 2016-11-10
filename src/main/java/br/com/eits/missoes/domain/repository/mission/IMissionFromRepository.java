package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;

public interface IMissionFromRepository extends JpaRepository<MissionFrom, Long>{

	MissionFrom findMissionFromById(Long missionFromId);
	List<MissionFrom> findMissionFromByAirport(Airport airport);
	List<MissionFrom> findMissionFromByMission(Mission mission);
	
}
