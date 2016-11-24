package br.com.eits.missoes.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@RequestMapping(value = "/missions", method = RequestMethod.GET)
	List<MissionPlanner> findAllMission() {
		return missionPlannerService.findAllMissionPlanner();
	}
}
