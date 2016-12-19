package br.com.eits.missoes.domain.repository.mission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;

public interface IMissionRepository extends JpaRepository<Mission, Long>{

	
	Mission findMissionById(Long missionId);
	List<Mission> findMissionByMissionFrom(Airport missionFrom);
	List<Mission> findMissionByMissionTo(Airport missionTo);
	
	@Query("FROM mission m WHERE m.airplane.airplaneModel.name like %:searchQuery%"
			+ " or m.missionTo.acronym like %:searchQuery%"
			+ " or m.missionFrom.acronym like %:searchQuery%")
	List<Mission> searchMission(@Param("searchQuery") String searchQuery);
}
