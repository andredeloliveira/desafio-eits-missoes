package br.com.eits.missoes.domain.entity;

import javax.persistence.Entity;

/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:22:49 AM
 */

@Entity
public class User {

	private String email;
	private String name;
	private Profile profile;
	private String password;
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