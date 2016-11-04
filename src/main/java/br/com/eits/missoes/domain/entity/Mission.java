package br.com.eits.missoes.domain.entity;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:34:02 AM
 */

@Entity
public class Mission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMission;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane")
	private Airplane airplane;
	
	@Column(name = "attached_file")
	private Byte[] attachedFile;
	
	@Column(name = "date_time")
	private Calendar dateTime;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane")
	private Aiport to;
	
	@ManyToOne
	@JoinColumn(name = "id_airplane")
	private Aiport from;
	
	@Column(name = "reason")
	private String reason;
	
	@ManyToMany
	@JoinTable(name = "mission_passenger")
	private User [] passengers;
	
	@ManyToMany
	@JoinTable(name = "mission_pilot")
	private User [] pilots;
	
	@ManyToOne
	@JoinColumn(name = "planned_by")
	private User plannedBy;
	
	
	
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
	public Calendar getDate_time() {
		return date_time;
	}
	public void setDate_time(Calendar date_time) {
		this.date_time = date_time;
	}
	public Aiport getTo() {
		return to;
	}
	public void setTo(Aiport to) {
		this.to = to;
	}
	public Aiport getFrom() {
		return from;
	}
	public void setFrom(Aiport from) {
		this.from = from;
	}
	public User [] getPassengers() {
		return passengers;
	}
	public void setPassengers(User [] passengers) {
		this.passengers = passengers;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public User [] getPilots() {
		return pilots;
	}
	public void setPilots(User [] pilots) {
		this.pilots = pilots;
	}
	public User getPlannedBy() {
		return plannedBy;
	}
	public void setPlannedBy(User plannedBy) {
		this.plannedBy = plannedBy;
	}

	

}