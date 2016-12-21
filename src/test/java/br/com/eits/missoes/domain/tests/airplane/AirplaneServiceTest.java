package br.com.eits.missoes.domain.tests.airplane;


import java.util.List;
import java.util.UUID;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.service.airplane.AirplaneModelService;
import br.com.eits.missoes.domain.service.airplane.AirplaneService;
import br.com.eits.missoes.domain.tests.AbstractIntegrationTest;


public class AirplaneServiceTest extends AbstractIntegrationTest{

	public static final String CLEAN_DATASET = "classpath:datasets/AbstractDataset.xml";
	public static final String AIRPLANES_DATASET = "classpath:datasets/AirplanesDataset.xml";
	
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	@Autowired(required = false)
	private AirplaneModelService airplaneModelService;
	
	@Test
	public void testInsertAirplaneMustPass() {
		Airplane airplane = new Airplane();
		AirplaneModel airplaneModel = airplaneModelService.findAirplaneModelById(122L);
		airplane.setAirplaneModel(airplaneModel);
		airplane.setSubscriptionNumber("AABBCC");
		airplane.setSeatsNumber(10);
		Airplane insertedAirplane = airplaneService.insertAirplane(airplane);
		Assert.assertEquals("AABBCC", insertedAirplane.getSubscriptionNumber());
		
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testRemoveAirplane() {
		Airplane airplaneToRemove = airplaneService.findAirplaneById(1L);
		airplaneService.removeAirplaneById(airplaneToRemove.getId());
		List<Airplane> totalAirplanes = airplaneService.findAllAirplane();
		Assert.assertEquals(2, totalAirplanes.size());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testSearchAirplane() {
		String searchQuery = "757";
		List<Airplane> searchResult = airplaneService.searchAirplane(searchQuery);
		Assert.assertEquals(1, searchResult.size());
	}
	
	
}







