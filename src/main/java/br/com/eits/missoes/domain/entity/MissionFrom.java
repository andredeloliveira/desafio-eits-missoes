package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MissionFrom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_mission_from")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_airport")
	private Airport airport;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Mission getMission() {
		return this.mission;
	}
	
	public void setMission(Mission mission) {
		this.mission = mission;
	}
	
	public Airport getAirport() {
		return this.airport;
	}
	
	public void setAirport(Airport airport) {
		this.airport = airport;
	}
}
