package br.com.eits.missoes.domain.service.mission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;
import br.com.eits.missoes.domain.entity.MissionTo;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.mission.IMissionRepository;

@Service
@Configurable
public class MissionService {

	@Autowired(required = false)
	private IMissionRepository missionRepository;
	
	@Transactional
	public Mission findMissionById(Long missionId) {
		return missionRepository.findMissionById(missionId);
	} 
	
	@Transactional
	public List<Mission> findMissionByMissionFrom(MissionFrom missionFrom) {
		return missionRepository.findMissionByMissionFrom(missionFrom);
	}
	
	@Transactional
	public List<Mission> findMisssionByMissionTo(MissionTo missionTo) {
		return missionRepository.findMissionByMissionTo(missionTo);
	}
	
	@Transactional
	public List<Mission> findMissionByPlannedBy(User plannedBy) {
		return missionRepository.findMissionByPlannedBy(plannedBy);
	}
	
	
}
