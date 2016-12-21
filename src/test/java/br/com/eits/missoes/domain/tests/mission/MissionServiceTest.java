package br.com.eits.missoes.domain.tests.mission;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.Airport;
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.airport.AirportService;
import br.com.eits.missoes.domain.service.mission.MissionPassengerService;
import br.com.eits.missoes.domain.service.mission.MissionPilotService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.user.UserService;
import br.com.eits.missoes.domain.tests.AbstractIntegrationTest;



public class MissionServiceTest extends AbstractIntegrationTest{
	
	public static final String CLEAN_DATASET = "classpath:datasets/AbstractDataset.xml";
	public static final String MISSIONS_DATASET = "classpath:datasets/MissionsDataset.xml";
	
	@Autowired(required = false)
	private MissionService missionService;

	@Autowired(required = false)
	private UserService userService;
	
	
	
	@Autowired(required = false)
	private MissionPassengerService missionPassengerService;
	
	@Autowired(required = false)
	private MissionPilotService missionPilotService;
	
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	@Autowired(required = false)
	private AirportService airportService;
		
	/*It does not pass the test due to some bizarre error*/
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {MISSIONS_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testinsertMission() {
		Mission mission = new Mission();
		Airplane airplane = airplaneService.findAirplaneById(1L);
		mission.setAirplane(airplane);
		Calendar dateTime = Calendar.getInstance();
		mission.setDateTime(dateTime);
		Airport missionFrom = airportService.findAirportById(1L);
		Airport missionTo = airportService.findAirportById(2L);
		mission.setMissionFrom(missionFrom);
		mission.setMissionTo(missionTo);
		mission.setReason("Reason explained here");
		Mission justInsertedMission = missionService.insertMission(mission);
		Assert.assertEquals("Reason explained here", justInsertedMission.getReason());
	}
	
	
	
}
















