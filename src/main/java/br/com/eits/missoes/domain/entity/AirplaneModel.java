package br.com.eits.missoes.domain.entity;

public class AirplaneModel {
	
	private String name;
	private AirplaneManufacturer manufacturer;
	
	
	public AirplaneManufacturer getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(AirplaneManufacturer manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
