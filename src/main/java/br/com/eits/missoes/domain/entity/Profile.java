package br.com.eits.missoes.domain.entity;


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
