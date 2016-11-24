package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "mission_planner")
public class MissionPlanner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_mission_planner")
	private Long id;
	
	
	@ManyToOne
	@JoinColumn(name = "id_mission")
	private Mission mission;
	
	@ManyToOne
	@JoinColumn(name = "id_user")
	private User planner;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public User getPlanner() {
		return planner;
	}
	
	public void setPlanner(User planner) {
		this.planner = planner;
	}
	
	public Mission getMission() {
		return this.mission;
	}
	
	public void setMission(Mission mission) {
		this.mission = mission;
	}
}
