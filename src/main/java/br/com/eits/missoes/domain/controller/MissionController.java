package br.com.eits.missoes.domain.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.eits.missoes.domain.entity.FileUpload;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.MissionPlanner;
import br.com.eits.missoes.domain.service.mission.MissionPassengerService;
import br.com.eits.missoes.domain.service.mission.MissionPilotService;
import br.com.eits.missoes.domain.service.mission.MissionPlannerService;
import br.com.eits.missoes.domain.service.mission.MissionService;

@RestController
public class MissionController {

	@Autowired(required = false)
	private MissionPlannerService missionPlannerService;
	
	@Autowired(required = false)
	private MissionService missionService;
	
	@Autowired(required = false)
	private MissionPassengerService missionPassengerService;
	
	@Autowired(required = false)
	private MissionPilotService missionPilotService;
	
	@RequestMapping(value = "/missions", method = RequestMethod.GET)
	List<MissionPlanner> findAllMission() {
		return missionPlannerService.findAllMissionPlanner();
	}
	
	@RequestMapping(value = "/missions/missionPlannerByMission", method = RequestMethod.POST)
	public MissionPlanner findMissionPlannerByMission(@RequestBody Mission mission) {
		return missionPlannerService.findMissionPlannerByMission(mission);
	}
	
	@RequestMapping(value = "/missions/missionPassengersByMission", method = RequestMethod.POST)
	public List<MissionPassenger> findMissionPassengersByMission(@RequestBody Mission mission){
		return missionPassengerService.findMissionPassengerByMission(mission);
	}
	
	@RequestMapping(value = "/missions/missionPilotsByMission", method = RequestMethod.POST)
	public List<MissionPilot> findMissionPilotsByMission(@RequestBody Mission mission){
		return missionPilotService.findMissionPilotByMission(mission);
	}
	
	/**/
	
	@RequestMapping(value = "/missions/insert", method = RequestMethod.POST)
	public Mission insertMission(@Valid @RequestBody Mission mission, BindingResult result) {
		return missionService.insertMission(mission);
	}
	
	@RequestMapping(value = "/missions/planner/insert", method = RequestMethod.POST)
	public MissionPlanner insertMissionPlanner(@RequestBody MissionPlanner planner, BindingResult result){
		return missionPlannerService.insertMissionPlanner(planner);
	}
	
	@RequestMapping(value = "/missions/passenger/insert", method = RequestMethod.POST)
	public MissionPassenger insertMissionPassenger(@RequestBody MissionPassenger passenger, BindingResult result){
		return missionPassengerService.insertMissionPassenger(passenger);
	}
	
	@RequestMapping(value = "/missions/pilot/insert", method = RequestMethod.POST)
	public MissionPilot insertMissionPilot(@RequestBody MissionPilot pilot, BindingResult result){
		return missionPilotService.insertMissionPilot(pilot);
	}
	
	@RequestMapping(value = "/missions/remove/{id}", method = RequestMethod.DELETE)
	public void removeMission(@PathVariable("id") Long id) {
		missionService.removeMissionById(id);
	}
	
	@RequestMapping(value = "/missions/missionPlanner/remove/{id}", method = RequestMethod.DELETE)
	public void removeMissionPlanner(@PathVariable("id") Long id) {
		missionPlannerService.removeMissionPlannerById(id);
	}
	
	@RequestMapping(value = "/missions/missionPilot/remove/{id}", method = RequestMethod.DELETE)
	public void removeMissionPilot(@PathVariable("id") Long id){
		missionPilotService.removeMissionPilotById(id);
	}
	
	@RequestMapping(value = "/missions/missionPassenger/{id}", method = RequestMethod.DELETE)
	public void removeMissionPassenger(@PathVariable("id") Long id){
		missionPassengerService.removeMissionPassengerById(id);
	}
	
	@RequestMapping(value = "/missions/uploadFile", method = RequestMethod.POST)
	public FileUpload uploadFile(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
		System.out.println("requested file " + file);
		return missionService.uploadFile(file);
	}
} 
