package br.com.eits.missoes.domain.service.mission;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.FileUpload;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.MissionPlanner;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.repository.airplane.IAirplaneRepository;
import br.com.eits.missoes.domain.repository.mission.IMissionRepository;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;

@Service
@Configurable
public class MissionService {

	@Autowired(required = false)
	private IMissionRepository missionRepository;
	
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	@Autowired(required = false)
	private MissionPlannerService missionPlannerService;
	
	@Autowired(required = false)
	private MissionPassengerService missionPassengerService;
	
	@Autowired(required = false)
	private MissionPilotService missionPilotService;
	
	@Transactional
	public void removeMission(Mission mission) {
		Mission missionToDelete = findMissionById(mission.getId());
		MissionPlanner planner = missionPlannerService.findMissionPlannerByMission(missionToDelete.getId());
		missionPlannerService.removeMissionPlannerById(planner.getId());
		List<MissionPassenger> allMissionPassengersFromMissionToBeDeleted = missionPassengerService.findMissionPassengerByMission(missionToDelete.getId());
		for(Iterator<MissionPassenger> i = allMissionPassengersFromMissionToBeDeleted.iterator(); i.hasNext();) {
			MissionPassenger passengerThatWillBeGone = i.next();
			missionPassengerService.removeMissionPassengerById(passengerThatWillBeGone.getId());
		}
		List<MissionPilot> allMissionPilotsFromMissionToBeDeleted = missionPilotService.findMissionPilotByMission(missionToDelete.getId());
		for (Iterator<MissionPilot> j = allMissionPilotsFromMissionToBeDeleted.iterator(); j.hasNext();) {
			MissionPilot pilotThatWillBeGone = j.next();
			missionPilotService.removeMissionPilotById(pilotThatWillBeGone.getId());
		}
		missionRepository.delete(mission);
	}
	
	@Transactional
	public List<Mission> findAllMission() {
		return missionRepository.findAll();
	}
	
	@Transactional 
	public Mission insertMission(Mission mission) {
		return missionRepository.saveAndFlush(mission);
	}
	
	@Transactional
	public Mission findMissionById(Long missionId) {
		return missionRepository.findMissionById(missionId);
	} 
	
	@Transactional
	public List<Mission> findMissionByMissionFrom(Airport missionFrom) {
		return missionRepository.findMissionByMissionFrom(missionFrom);
	}
	
	
	@Transactional
	public List<Mission> findMisssionByMissionTo(Airport missionTo) {
		return missionRepository.findMissionByMissionTo(missionTo);
	}
	
	@Transactional
	public FileUpload uploadFile(MultipartFile file) throws IllegalStateException, IOException {
		String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
		File newFile = new File(System.getenv("HOME") + "/andre/desafio-eits-missoes/src/main/webapp/WEB-INF/assets/uploads/" + fileName);
		file.transferTo(newFile);
		FileUpload returnedFile = new FileUpload();
		returnedFile.setLink("http://localhost:8080/missoes/assets/uploads" + fileName);
		return returnedFile;
	}
	
	@Transactional
	public List<Mission> searchMission(String searchQuery) {
		return missionRepository.searchMission(searchQuery);
	}
	
	// It finishes the flight updating the total flight hours of the related airplane as well as the status of the mission
	@Transactional
	public Mission finishFlight(Mission mission) {
		Long rightNow = Calendar.getInstance().getTimeInMillis();
		Long initialTime = mission.getDateTime().getTimeInMillis();
		Long timeDifference = TimeUnit.MILLISECONDS.toHours((rightNow - initialTime)); 
		Airplane airplaneToUpdate = mission.getAirplane();
		airplaneToUpdate.setTotalFlightTime(timeDifference + airplaneToUpdate.getTotalFlightTime());
		airplaneService.insertAirplane(airplaneToUpdate);
		mission.setFinished(true);
		return this.insertMission(mission);
	}
}
