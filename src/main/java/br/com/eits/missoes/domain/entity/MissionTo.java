package br.com.eits.missoes.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MissionTo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMissionTo;
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_airport")
	private Airport airport;
	
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
