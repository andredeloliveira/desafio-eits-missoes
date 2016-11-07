package br.com.eits.missoes.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MissionPilot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMissionPilot;
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_pilot")
	private User pilot;
	
	
	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
	}

	public User getPilot() {
		return pilot;
	}

	public void setPilot(User pilot) {
		this.pilot = pilot;
	}
	
}
