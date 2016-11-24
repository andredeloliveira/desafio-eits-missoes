package br.com.eits.missoes.domain.repository.mission;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.eits.missoes.domain.entity.MissionPlanner;

public interface IMissionPlannerRepository extends JpaRepository<MissionPlanner, Long>{

}
