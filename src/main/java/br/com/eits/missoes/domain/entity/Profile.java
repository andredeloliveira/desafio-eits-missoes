package br.com.eits.missoes.domain.entity;

public enum Profile {
	ADMINISTRADOR("Administrador"),
	PILOTO("Piloto"),
	PASSAGEIRO("Passageiro");
	
	private String perfilAcesso;
	
	Profile(String perfilAcesso) {
		this.perfilAcesso = perfilAcesso;
	}
	
	public String getPerfil() {
		return this.perfilAcesso;
	}
}
