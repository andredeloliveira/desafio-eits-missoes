package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class AirplaneManufacturer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ir_airplane_manufacturer")
	private Long id;
	
	@Column(name = "manufacturer")
	@NotBlank(message = "O Fabricante é obrigatório")
	private String manufacturer;

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public String getManufacturer() {
		return this.manufacturer;
	}

	public void setNomeFabricante(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	
	
}
