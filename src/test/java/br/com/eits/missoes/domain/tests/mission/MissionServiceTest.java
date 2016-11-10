package br.com.eits.missoes.domain.tests.mission;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.eits.missoes.domain.service.mission.MissionFromService;
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
	private MissionToService missionTo;
	
	@Autowired(required = false)
	private MissionFromService missionFrom;
	
//	@Autowired(required = false)
//	private MissionP
	
}
