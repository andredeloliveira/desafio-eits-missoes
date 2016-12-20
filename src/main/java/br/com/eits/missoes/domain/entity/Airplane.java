package br.com.eits.missoes.domain.entity;

import java.time.Instant;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

/**
 * Represents a literal Airplane with a subscription number that identify which
 * only a few attributes of an Airplane are being described
 * @author andre
 * @version 1.0
 */

@Entity(name = "airplane")
public class Airplane {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_airplane")
	private Long id;
	
	@Column(name = "total_flight_time")
	@NotNull(message = "O tempo total de vôo é obrigatório")
	private Long totalFlightTime;
	
	@Column(name = "subscription_number")
	@NotBlank(message = "A matrícula é obrigatória")
	private String subscriptionNumber;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane_model")
	private AirplaneModel airplaneModel;
	
	@NotNull(message = "O número de assentos da aeronave é obrigatório")
	@Column(name = "seats_number")
	private int seatsNumber;

	
	private String exception;
	
	public String getException() {
		return exception;
	}
	
	public void setException(String exception) {
		this.exception = exception;
	}
	
	public Airplane(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Airplane() {
		this.totalFlightTime = (long) 0;
	}
	
	public Long getTotalFlightTime() {
		return totalFlightTime;
	}
	public void setTotalFlightTime(Long totalFlightTime) {
		this.totalFlightTime = totalFlightTime;
	}
	public String getSubscriptionNumber() {
		return subscriptionNumber;
	}
	public void setSubscriptionNumber(String subscriptionNumber) {
		this.subscriptionNumber = subscriptionNumber;
	}
	
	public AirplaneModel getAirplaneModel() {
		return this.airplaneModel;
	}
	
	public void setAirplaneModel(AirplaneModel airplaneModel) {
		this.airplaneModel = airplaneModel;
	}
	public int getSeatsNumber() {
		return seatsNumber;
	}
	public void setSeatsNumber(int seatsNumber) {
		this.seatsNumber = seatsNumber;
	}
	
	

}