package br.com.eits.missoes.domain.entity;

public enum PerfilAcesso {
	ADMINISTRADOR("Administrador"),
	PILOTO("Piloto"),
	PASSAGEIRO("Passageiro");
	
	private String perfilAcesso;
	
	PerfilAcesso(String perfilAcesso) {
		this.perfilAcesso = perfilAcesso;
	}
	
	public String getPerfil() {
		return this.perfilAcesso;
	}
}
