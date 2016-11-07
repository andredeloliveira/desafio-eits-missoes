package br.com.eits.missoes.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MissionPassenger {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMissionPassenger;
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_passenger")
	private User passenger;
	
	public Mission getMission() {
		return mission;
	}
	
	public void setMission(Mission mission) {
		this.mission = mission;
	}
	
	public User getPassenger() {
		return passenger;
	}
	
	public void setPassenger(User passenger) {
		this.passenger = passenger;
	}
	
}
