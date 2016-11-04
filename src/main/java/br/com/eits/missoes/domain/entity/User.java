package br.com.eits.missoes.domain.entity;


/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:22:49 AM
 */
public class User {

	private String email;
	private String nome;
	private Profile profile;
	private String senha;
	private String status;

	public User(){

	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}