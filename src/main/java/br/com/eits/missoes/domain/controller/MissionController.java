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
	
	
	@RequestMapping(value = "/missions/{id}", method = RequestMethod.GET)
	Mission findMissionById(@PathVariable("id") Long missionId) {
		return missionService.findMissionById(missionId);
	}	
	
	@RequestMapping(value = "/missions", method = RequestMethod.GET)
	List<MissionPlanner> findAllMission() {
		return missionPlannerService.findAllMissionPlanner();
	}
	
	@RequestMapping(value = "/missions/missionPlannerByMission/{id}", method = RequestMethod.GET)
	public MissionPlanner findMissionPlannerByMission(@PathVariable("id") Long missionId) {
		return missionPlannerService.findMissionPlannerByMission(missionId);
	}
	
	@RequestMapping(value = "/missions/missionPassengersByMission/{id}", method = RequestMethod.GET)
	public List<MissionPassenger> findMissionPassengersByMission(@PathVariable("id") Long missionId){
		return missionPassengerService.findMissionPassengerByMission(missionId);
	}
	
	@RequestMapping(value = "/missions/missionPilotsByMission/{id}", method = RequestMethod.GET)
	public List<MissionPilot> findMissionPilotsByMission(@PathVariable("id") Long missionId){
		return missionPilotService.findMissionPilotByMission(missionId);
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
	
	@RequestMapping(value = "/missions/remove", method = RequestMethod.POST)
	public void removeMission(@RequestBody Mission mission) {
		missionService.removeMission(mission);
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
	
	@RequestMapping(value = "/missions/search", params={"query"}, method = RequestMethod.GET)
	public List<MissionPlanner> searchMission(@RequestParam("query") String searchQuery) {
		return missionPlannerService.searchMissions(searchQuery);
	}
	
	@RequestMapping( value = "/missions/finishFlight", method = RequestMethod.POST)
	public Mission finishFlight(@RequestBody Mission mission) {
		return missionService.finishFlight(mission);
	}
} 
