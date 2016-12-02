package br.com.eits.missoes.domain.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
	
	@RequestMapping(value = "/missions/insert", method = RequestMethod.POST)
	public Mission insertMission(@Valid @RequestBody Mission mission, BindingResult result) {
		if (result.hasErrors()) {
			System.out.println(result.getErrorCount());
		}
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
} 
