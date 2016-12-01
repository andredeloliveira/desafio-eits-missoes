package br.com.eits.missoes.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:22:49 AM
 */

@Entity(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private Long id;
	
	@Column(name = "email")
	@NotBlank(message = "Email é obrigaório")
	private String email;
	
	
	@Column(name = "name")
	@NotBlank(message = "Nome é obrigatório")
	private String name;
	
	private Profile profile;
	
	@Column(name = "password")
	@JsonIgnore
	@NotBlank(message = "Senha é obrigatória")
	private String password;
	
	//TODO(andre): Define a initial value for status (Activated -> Then we can activate it afterwards)
	@Column(name = "status")
	private Boolean status;

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
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

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
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
	
	public User() {
		this.status = true;
	}

}