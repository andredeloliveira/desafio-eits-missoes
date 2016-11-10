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
import br.com.eits.missoes.domain.entity.Mission;
import br.com.eits.missoes.domain.entity.MissionFrom;
import br.com.eits.missoes.domain.entity.MissionPassenger;
import br.com.eits.missoes.domain.entity.MissionPilot;
import br.com.eits.missoes.domain.entity.MissionTo;
import br.com.eits.missoes.domain.entity.User;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.service.mission.MissionFromService;
import br.com.eits.missoes.domain.service.mission.MissionPassengerService;
import br.com.eits.missoes.domain.service.mission.MissionPilotService;
import br.com.eits.missoes.domain.service.mission.MissionService;
import br.com.eits.missoes.domain.service.mission.MissionToService;
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
	private MissionToService missionToService;
	
	@Autowired(required = false)
	private MissionFromService missionFromService;
	
	@Autowired(required = false)
	private MissionPassengerService missionPassengerService;
	
	@Autowired(required = false)
	private MissionPilotService missionPilotService;
	
	@Autowired(required = false)
	private AirplaneService airplaneService;
		
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {MISSIONS_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testinsertMission() {
		
		Mission mission = new Mission();
		Instant now = Instant.now();
		
		//TODO: add on dataset;
		User user = userService.findUserById(new Long(1));
		List<MissionPassenger> missionPassengers = 
				missionPassengerService.findAllMissionPassenger();
		List<MissionPilot> missionPilots =
				missionPilotService.findAllMissionPilot();
		MissionTo missionTo = missionToService.findMissionToById(new Long(1));
		MissionFrom missionFrom = missionFromService.findMissionFromById(new Long(2));
		Airplane airplane = airplaneService.findAirplaneById(new Long(1));
		User plannedBy = userService.findUserById(new Long(1));

		
		/****/
		mission.setDateTime(now);
		mission.setReason("Viagem a negócios");
		mission.setPlannedBy(user);
		mission.setTo(missionTo);
		mission.setFrom(missionFrom);
		mission.setPilots(missionPilots);
		mission.setPassengers(missionPassengers);
		mission.setAirplane(airplane);
		mission.setPlannedBy(plannedBy);
		
		Mission insertedMission = missionService.insertMission(mission);
		
		Assert.assertNotNull(mission);
		Assert.assertEquals("Viagem a negócios", insertedMission.getReason());
		
	}
	
}
















