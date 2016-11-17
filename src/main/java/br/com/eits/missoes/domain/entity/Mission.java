package br.com.eits.missoes.domain.entity;

import java.time.Instant;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:34:02 AM
 */

@Entity(name = "mission")
public class Mission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_mission")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane")
	private Airplane airplane;
	
	@Column(name = "attached_file")
	private Byte[] attachedFile;
	
	@Column(name = "date_time")
	private Instant dateTime;
	
	@ManyToOne
	@JoinColumn(name = "id_mission_to")
	private Airport missionTo;
	
	@ManyToOne
	@JoinColumn(name = "id_mission_from")
	private Airport missionFrom;
	
	@Column(name = "reason")
	private String reason;
	
	@OneToMany
	private List<MissionPassenger> passengers;
	
	@OneToMany
	private List<MissionPilot> pilots;
	
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Airplane getAirplane() {
		return airplane;
	}
	
	public void setAirplane(Airplane airplane) {
		this.airplane = airplane;
	}
	public Byte[] getAttachedFile() {
		return attachedFile;
	}
	public void setAttachedFile(Byte[] attachedFile) {
		this.attachedFile = attachedFile;
	}
	public Instant getDateTime() {
		return dateTime;
	}
	public void setDateTime(Instant instant) {
		this.dateTime = instant;
	}
	public Airport getMissionTo() {
		return missionTo;
	}
	public void setMissionTo(Airport to) {
		this.missionTo = to;
	}
	public Airport getMissionFrom() {
		return missionFrom;
	}
	public void setMissionFrom(Airport from) {
		this.missionFrom = from;
	}
	public List<MissionPassenger> getPassengers() {
		return passengers;
	}
	public void setPassengers(List<MissionPassenger> passengers) {
		this.passengers = passengers;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public List<MissionPilot> getPilots() {
		return pilots;
	}
	public void setPilots(List<MissionPilot> pilots) {
		this.pilots = pilots;
	}

	

}