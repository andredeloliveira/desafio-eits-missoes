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

/**
 * Controls all the functionalities that are tied with the Mission entity
 * @author andre
 * @version 1.0
 */
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
	
	/**
	 * Gets a Mission from its Id
	 * @param missionId
	 * @return Mission object
	 */
	@RequestMapping(value = "/missions/{id}", method = RequestMethod.GET)
	Mission findMissionById(@PathVariable("id") Long missionId) {
		return missionService.findMissionById(missionId);
	}	
	
	/**
	 * Gets all the MissionPlanner objects from the DB.
	 * @return Collection of MissionPlanner (containing data from both  Mission and Planner objects)
	 * 
	 */
	@RequestMapping(value = "/missions", method = RequestMethod.GET)
	List<MissionPlanner> findAllMission() {
		return missionPlannerService.findAllMissionPlanner();
	}
	
	/**
	 * Gets the MissionPlanner that is tied to a Mission
	 * @param missionId
	 * @return
	 */
	@RequestMapping(value = "/missions/missionPlannerByMission/{id}", method = RequestMethod.GET)
	public MissionPlanner findMissionPlannerByMission(@PathVariable("id") Long missionId) {
		return missionPlannerService.findMissionPlannerByMission(missionId);
	}
	
	/**
	 * Gets all the Passenger related to a Mission
	 * @param missionId
	 * @return Collection of MissionPassenger
	 */
	@RequestMapping(value = "/missions/missionPassengersByMission/{id}", method = RequestMethod.GET)
	public List<MissionPassenger> findMissionPassengersByMission(@PathVariable("id") Long missionId){
		return missionPassengerService.findMissionPassengerByMission(missionId);
	}
	
	/**
	 * Gets all the Pilot related to a Mission
	 * @param missionId
	 * @return Collection of MissionPilot
	 */
	@RequestMapping(value = "/missions/missionPilotsByMission/{id}", method = RequestMethod.GET)
	public List<MissionPilot> findMissionPilotsByMission(@PathVariable("id") Long missionId){
		return missionPilotService.findMissionPilotByMission(missionId);
	}
	
	/**
	 * Inserts or Update a new Mission
	 * @param mission
	 * @param result
	 * @return Mission object containing all the just-inserted data
	 */
	@RequestMapping(value = "/missions/insert", method = RequestMethod.POST)
	public Mission insertMission(@Valid @RequestBody Mission mission, BindingResult result) {
		return missionService.insertMission(mission);
	}
	
	/**
	 * Inserts a new MissionPlanner
	 * @param planner
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/missions/planner/insert", method = RequestMethod.POST)
	public MissionPlanner insertMissionPlanner(@RequestBody MissionPlanner planner, BindingResult result){
		return missionPlannerService.insertMissionPlanner(planner);
	}
	
	/**
	 * Inserts a new MissionPassenger 
	 * @param passenger
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/missions/passenger/insert", method = RequestMethod.POST)
	public MissionPassenger insertMissionPassenger(@RequestBody MissionPassenger passenger, BindingResult result){
		return missionPassengerService.insertMissionPassenger(passenger);
	}
	
	/**
	 * Inserts a new MissionPilot
	 * @param pilot
	 * @param result
	 * @return
	 */
	@RequestMapping(value = "/missions/pilot/insert", method = RequestMethod.POST)
	public MissionPilot insertMissionPilot(@RequestBody MissionPilot pilot, BindingResult result){
		return missionPilotService.insertMissionPilot(pilot);
	}
	
	/**
	 * R
	 * @param mission
	 */
	@RequestMapping(value = "/missions/remove", method = RequestMethod.POST)
	public void removeMission(@RequestBody Mission mission) {
		missionService.removeMission(mission);
	}
	
	/**
	 * Removes a MissionPlanne
	 * @param missionPlannerId
	 */
	@RequestMapping(value = "/missions/missionPlanner/remove/{id}", method = RequestMethod.DELETE)
	public void removeMissionPlanner(@PathVariable("id") Long missionPlannerId) {
		missionPlannerService.removeMissionPlannerById(missionPlannerId);
	}
	
	/**
	 * Removes a MissionPilot
	 * @param missionPilotId
	 */
	@RequestMapping(value = "/missions/missionPilot/remove/{id}", method = RequestMethod.DELETE)
	public void removeMissionPilot(@PathVariable("id") Long missionPilotId){
		missionPilotService.removeMissionPilotById(missionPilotId);
	}
	
	/**
	 * Removes a MissionPassenger
	 * @param missionPassengerId
	 */
	@RequestMapping(value = "/missions/missionPassenger/{id}", method = RequestMethod.DELETE)
	public void removeMissionPassenger(@PathVariable("id") Long missionPassengerId){
		missionPassengerService.removeMissionPassengerById(missionPassengerId);
	}
	
	/**
	 * Uploads a File that is related to the Mission
	 * @param file
	 * @return Successfully uploaded file 
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@RequestMapping(value = "/missions/uploadFile", method = RequestMethod.POST)
	public FileUpload uploadFile(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
		System.out.println("requested file " + file);
		return missionService.uploadFile(file);
	}
	
	/**
	 * Searches Mission in the DB from an given Query stated in the IMissionPlannerRepository repository
	 * @see IMissionPlanner
	 * @param searchQuery
	 * @return Collection of MissionPlanner
	 */
	@RequestMapping(value = "/missions/search", params={"query"}, method = RequestMethod.GET)
	public List<MissionPlanner> searchMission(@RequestParam("query") String searchQuery) {
		return missionPlannerService.searchMissions(searchQuery);
	}
	
	/**
	 * Finishes a given Mission (Flight)
	 * @param mission
	 * @return Successfully finished Mission(Flight)
	 */
	@RequestMapping( value = "/missions/finishFlight", method = RequestMethod.POST)
	public Mission finishFlight(@RequestBody Mission mission) {
		return missionService.finishFlight(mission);
	}
} 
