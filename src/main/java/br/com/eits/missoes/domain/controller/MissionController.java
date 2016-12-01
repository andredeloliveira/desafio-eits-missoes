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
import br.com.eits.missoes.domain.entity.MissionPlanner;
import br.com.eits.missoes.domain.service.mission.MissionPlannerService;
import br.com.eits.missoes.domain.service.mission.MissionService;

@RestController
public class MissionController {

	@Autowired(required = false)
	private MissionPlannerService missionPlannerService;
	
	@Autowired(required = false)
	private MissionService missionService;
	
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
}
