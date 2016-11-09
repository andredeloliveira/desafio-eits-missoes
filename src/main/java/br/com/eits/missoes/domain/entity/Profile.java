package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;


public enum Profile {
	ADMINISTRADOR("Administrador"),
	PILOTO("Piloto"),
	PASSAGEIRO("Passageiro");
	

	private String profile;
	
	Profile(String profile) {
		this.profile = profile;
	}
	
	public String getProfile() {
		return this.profile;
	}
}
