package br.com.eits.missoes.domain.entity;


/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:14:25 AM
 */
public class Airplane {

	private int totalFlightTime;
	private String subscriptionNumber;
	private AirplaneModel model;
	private int seatsNumber;
	
	
	public int getTotalFlightTime() {
		return totalFlightTime;
	}
	public void setTotalFlightTime(int totalFlightTime) {
		this.totalFlightTime = totalFlightTime;
	}
	public String getSubscriptionNumber() {
		return subscriptionNumber;
	}
	public void setSubscriptionNumber(String subscriptionNumber) {
		this.subscriptionNumber = subscriptionNumber;
	}
	public AirplaneModel getModel() {
		return model;
	}
	public void setModel(AirplaneModel model) {
		this.model = model;
	}
	public int getSeatsNumber() {
		return seatsNumber;
	}
	public void setSeatsNumber(int seatsNumber) {
		this.seatsNumber = seatsNumber;
	}
	
	

}