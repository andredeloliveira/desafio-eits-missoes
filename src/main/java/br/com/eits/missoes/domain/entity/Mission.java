package br.com.eits.missoes.domain.entity;

import java.util.Calendar;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:34:02 AM
 */
public class Mission {

	private Airplane airplane;
	private Byte[] attachedFile;
	private Calendar date_time;
	private Aiport to;
	private Aiport from;
	private String reason;
	private User [] passengers;
	private User [] pilots;
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