package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class Aiport {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idAirport;

	@Column(name = "name")
	@NotBlank(message = "O nome do Aeroporto é obrigatório")
	private String name;
	
	@Column(name = "acronym")
	@NotBlank(message = "A sigla do Aeroporto é obrigatória")	
	private String acronym;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAcronym() {
		return acronym;
	}
	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	
}
