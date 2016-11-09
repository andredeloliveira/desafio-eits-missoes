package br.com.eits.missoes.domain.tests;

import java.sql.Timestamp;
import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import br.com.eits.missoes.domain.entity.Airplane;
import br.com.eits.missoes.domain.entity.AirplaneModel;
import br.com.eits.missoes.domain.service.AirplaneService;


public class AirplaneServiceTest extends AbstractIntegrationTest{

	public static final String CLEAN_DATASET = "classpath:datasets/AbstractDataset.xml";
	public static final String AIRPLANES_DATASET = "classpath:datasets/AirplanesDataset.xml";
	
	@Autowired(required = false)
	private AirplaneService airplaneService;
	
	@Test
	public void testInsertAirplaneMustPass() {
		Airplane airplane = new Airplane();
		airplane.setSeatsNumber(200);
		airplane.setTotalFlightTime(2.444);
		airplane.setModel(new AirplaneModel());
		airplane.setSubscriptionNumber(UUID.randomUUID().toString());
		Airplane airplaneResult = airplaneService.insertAirplane(airplane);
		Assert.assertNotNull(airplaneResult);
		Assert.assertEquals(200,airplane.getSeatsNumber());
	}
	
}
