package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPlanner;

public interface IMissionPlannerRepository extends JpaRepository<MissionPlanner, Long>{

	MissionPlanner findMissionPlannerByMission(Mission mission);
	
	@Query("FROM mission_planner m WHERE m.mission.airplane.airplaneModel.name like %:searchQuery%"
			+ " or m.mission.missionTo.acronym like %:searchQuery%"
			+ " or m.mission.missionFrom.acronym like %:searchQuery%")
	List<MissionPlanner> searchMission(@Param("searchQuery") String searchQuery);
}
