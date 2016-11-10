package br.com.eits.missoes.domain.repository.mission;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;
import br.com.eits.missoes.domain.entity.MissionTo;
import br.com.eits.missoes.domain.entity.User;

public interface IMissionRepository extends JpaRepository<Mission, Long> {

	Mission findMissionById(Long missionId);
	
	List<Mission> findMissionByMissionFrom(MissionFrom missionFrom);
	
	List<Mission> findMissionByMissionTo(MissionTo missionTo);
	
	List<Mission> findMissionByDateTime(Calendar dateTime);
	
	List<Mission> findMissionByPlannedBy(User plannedBy);
	
}
