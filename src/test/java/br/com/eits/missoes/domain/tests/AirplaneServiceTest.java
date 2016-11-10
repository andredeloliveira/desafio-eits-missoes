package br.com.eits.missoes.domain.tests;


import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.service.AirplaneModelService;
import br.com.eits.missoes.domain.service.AirplaneService;


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
		//We need two services here. One to get the existing airplane model from the db
		AirplaneModel airplaneModel = airplaneModelService.findAirplaneModelById(new Long(122));
		airplane.setModel(airplaneModel);
		Airplane airplaneResult = airplaneService.insertAirplane(airplane);
		Assert.assertNotNull(airplaneResult);
		Assert.assertEquals(200,airplane.getSeatsNumber());
	}
	
}
