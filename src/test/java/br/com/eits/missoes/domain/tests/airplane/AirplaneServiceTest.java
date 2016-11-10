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
		airplane.setSeatsNumber(200);
		airplane.setTotalFlightTime(2.444);
		airplane.setSubscriptionNumber(UUID.randomUUID().toString());
		//We need two services here. One to get the existing airplane model from the db and the other to
		//actually add an airplane
		AirplaneModel airplaneModel = airplaneModelService.findAirplaneModelById(new Long(122));
		airplane.setModel(airplaneModel);
		Airplane airplaneResult = airplaneService.insertAirplane(airplane);
		Assert.assertNotNull(airplaneResult);
		Assert.assertEquals(200,airplane.getSeatsNumber());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testRemoveAirplane() {
		Airplane airplane = airplaneService.findAirplaneById(new Long(1));
		airplaneService.removeAirplane(airplane);
		List<Airplane> airplanes = airplaneService.findAllAirplane();
		Assert.assertEquals(2, airplanes.size());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testFindAllAirplane() {
		List<Airplane> airplanes = airplaneService.findAllAirplane();
		Assert.assertNotNull(airplanes);
		Assert.assertEquals(3, airplanes.size());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testfindAirplaneById() {
		//this is an existing id in the AirplanesDataset described above
		Airplane airplane = airplaneService.findAirplaneById(new Long(1));
		Assert.assertNotNull(airplane);
		Assert.assertEquals("fkjdlk9393", airplane.getSubscriptionNumber());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testfindAirplaneByModel() {
	
		AirplaneModel airplaneModel = airplaneModelService.findAirplaneModelById(new Long(122));
		List<Airplane> airplanes = airplaneService.findAirplaneByAirplaneModel(airplaneModel);
		Assert.assertNotNull(airplanes);
		Assert.assertEquals(3, airplanes.size());
		
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testfindAirplaneBySeatsNumber() {
		Airplane airplane = airplaneService.findAirplaneBySeatsNumber(new Integer(200));
		Assert.assertNotNull(airplane);
		Assert.assertEquals("fkjdlk9393", airplane.getSubscriptionNumber());
	}
	
	@Test
	@DatabaseSetup(type = DatabaseOperation.CLEAN_INSERT, value = {AIRPLANES_DATASET}, connection = "dataSource")
	@DatabaseTearDown(CLEAN_DATASET)
	public void testFindAirplaneBySubscriptionNumber() {
		Airplane airplane = airplaneService.findAirplaneBySubscriptionNumber("fkjdlk9393");
		Assert.assertNotNull(airplane);
		Assert.assertEquals(new Double(500.44), airplane.getTotalFlightTime());
	}
	
	
}







