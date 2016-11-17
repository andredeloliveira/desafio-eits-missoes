package br.com.eits.missoes.domain.tests.mission;

import java.time.Instant;
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
		
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {MISSIONS_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testinsertMission() {
		
		Mission mission = new Mission();
		Instant now = Instant.now();
		
		//TODO: add on dataset;
		
		/*
		 * check all services if they are all available
		 * */
		
		User user = userService.findUserById(new Long(1));
		List<MissionPassenger> missionPassengers = 
				missionPassengerService.findAllMissionPassenger();
		System.out.println("pass" + missionPassengers);
		List<MissionPilot> missionPilots =
				missionPilotService.findAllMissionPilot();

		Airplane airplane = airplaneService.findAirplaneById(new Long(1));
		User plannedBy = userService.findUserById(new Long(1));
		
		
		Airport missionTo = airportService.findAirportByAcronym("IGU");
		Airport missionFrom = airportService.findAirportByAcronym("GRU");
		
		
		System.out.println("pilot " + missionPilots);
		System.out.println("airpl " + airplane.getId());
		System.out.println("plan " + plannedBy);
		System.out.println("time "+ now);
		
		/****/
		mission.setDateTime(now);
		mission.setReason("Viagem a negócios");
		mission.setPilots(missionPilots);
		mission.setPassengers(missionPassengers);
		mission.setMissionTo(missionTo);
		mission.setMissionFrom(missionFrom);
		mission.setAirplane(new Airplane(1L));
		
		Mission insertedMission = missionService.insertMission(mission);
		
		System.out.println("this mission was just inserted! "+ insertedMission.getId());
		
		Assert.assertNotNull(mission);
		Assert.assertEquals("Viagem a negócios", insertedMission.getReason());
		
	}
	
}
















