package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotBlank;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:22:49 AM
 */

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idUser;
	
	@Column(name = "email")
	@NotBlank(message = "Email é obrigaório")
	private String email;
	
	
	@Column(name = "name")
	@NotBlank(message = "Nome é obrigatório")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "id_profile")
	private Profile profile;
	
	@Column(name = "password")
	@NotBlank(message = "Senha é obrigatória")
	private String password;
	
	//TODO(andre): Define a initial value for status (Activated -> Then we can activate it aferwards)
	@Column(name = "status")
	private String status;

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Profile getPerfilAcesso() {
		return profile;
	}

	public void setPerfilAcesso(Profile profile) {
		this.profile = profile;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

}