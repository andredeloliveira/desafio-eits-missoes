package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Proxy(lazy = false)
@JsonIgnoreProperties(ignoreUnknown = false)
@Entity(name = "mission_passenger")
public class MissionPassenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_mission_passenger")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_passenger")
	private User user;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Mission getMission() {
		return mission;
	}
	
	public void setMission(Mission mission) {
		this.mission = mission;
	}
	
	public User getPassenger() {
		return user;
	}
	
	public void setPassenger(User passenger) {
		this.user = passenger;
	}
	
}
