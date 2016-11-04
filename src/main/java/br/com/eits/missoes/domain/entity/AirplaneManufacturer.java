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
	private Integer id_manufacturer;
	
	@Column(name = "manufacturer")
	@NotBlank(message = "O Fabricante é obrigatório")
	private String manufacturer;

	public String getManufacturer() {
		return this.manufacturer;
	}

	public void setNomeFabricante(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	
	
}
