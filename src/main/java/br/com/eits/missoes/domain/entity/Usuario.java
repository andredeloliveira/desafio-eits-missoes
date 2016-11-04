package br.com.eits.missoes.domain.entity;


/**
 * @author andre
 * @version 1.0
 * @created 04-Nov-2016 10:22:49 AM
 */
public class Usuario {

	private String email;
	private String nome;
	private PerfilAcesso perfilAcesso;
	private String senha;
	private String status;

	public Usuario(){

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

	public PerfilAcesso getPerfilAcesso() {
		return perfilAcesso;
	}

	public void setPerfilAcesso(PerfilAcesso perfilAcesso) {
		this.perfilAcesso = perfilAcesso;
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