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

import org.hibernate.validator.constraints.NotBlank;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:14:25 AM
 */

@Entity
public class Airplane {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_airplane")
	private Long id;
	
	@Column(name = "total_flight_time")
	@NotBlank(message = "O tempo total de vôo é obrigatório")
	private double totalFlightTime;
	
	@Column(name = "subscription_number")
	@NotBlank(message = "A matrícula é obrigatória")
	private String subscriptionNumber;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane_model")
	private AirplaneModel model;
	
	@NotBlank(message = "O número de assentos da aeronave é obrigatório")
	@Column(name = "seats_number")
	private int seatsNumber;
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Airplane() {
		this.subscriptionNumber = UUID.randomUUID().toString();
	}
	
	public Float getTotalFlightTime() {
		return totalFlightTime;
	}
	public void setTotalFlightTime(double totalFlightTime) {
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