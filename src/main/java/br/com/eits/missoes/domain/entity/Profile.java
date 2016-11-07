package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public enum Profile {
	ADMINISTRADOR("Administrador"),
	PILOTO("Piloto"),
	PASSAGEIRO("Passageiro");
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idProfile;
	
	@Column(name = "profile")
	@NotBlank(message = "Profile é obrigatório")
	private String profile;
	
	Profile(String profile) {
		this.profile = profile;
	}
	
	public String getProfile() {
		return this.profile;
	}
}
