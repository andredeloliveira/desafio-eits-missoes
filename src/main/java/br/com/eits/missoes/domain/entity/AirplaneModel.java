package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class AirplaneModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_airplane_model")
	private Long id;
	
	@Column(name = "name")
	@NotBlank(message = "O nome do modelo da aeronave é obrigatório")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "id_manufacturer")
	private AirplaneManufacturer manufacturer;
	
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
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
