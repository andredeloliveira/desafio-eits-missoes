package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;

public interface IMissionRepository extends JpaRepository<Mission, Long>{

	
	Mission findMissionById(Long missionId);
	List<Mission> findMissionByMissionFrom(Airport missionFrom);
	List<Mission> findMissionByMissionTo(Airport missionTo);
}
