package br.com.eits.missoes.domain.entity;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
	private Calendar dateTime;
	
	@ManyToOne
	@JoinColumn(name = "id_mission_to")
	private MissionTo to;
	
	@ManyToOne
	@JoinColumn(name = "id_mission_from")
	private MissionFrom from;
	
	@Column(name = "reason")
	private String reason;
	
	@OneToMany
	@JoinColumn(name = "id_mission_passenger")
	private List<MissionPassenger> passengers;
	
	@OneToMany
	@JoinColumn(name = "id_mission_pilot")
	private List<MissionPilot> pilots;
	
	@OneToOne
	@JoinColumn(name = "planned_by")
	private User plannedBy;
	
	
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
	public Calendar getDateTime() {
		return dateTime;
	}
	public void setDate_time(Calendar dateTime) {
		this.dateTime = dateTime;
	}
	public MissionTo getTo() {
		return to;
	}
	public void setTo(MissionTo to) {
		this.to = to;
	}
	public MissionFrom getFrom() {
		return from;
	}
	public void setFrom(MissionFrom from) {
		this.from = from;
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
	public User getPlannedBy() {
		return plannedBy;
	}
	public void setPlannedBy(User plannedBy) {
		this.plannedBy = plannedBy;
	}

	

}